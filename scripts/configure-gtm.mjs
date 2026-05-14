#!/usr/bin/env node
// Creates GA4 + Mews ecommerce + Triptease tags in the Inn32 GTM workspace.
// Idempotent: skips entities whose names already exist in the workspace.

import { execSync } from 'node:child_process';

const ACCOUNT_ID = '6292019473';
const CONTAINER_ID = '218317627';
const WORKSPACE_ID = '7';
const QUOTA_PROJECT = 'inn32-marketing';

const GA4_MEASUREMENT_ID = 'G-FGY7MWEYHF';
const TRIPTEASE_ID = '01JPSZQHEV04PY50GNZ73PBCNQ';

const BASE = `https://www.googleapis.com/tagmanager/v2/accounts/${ACCOUNT_ID}/containers/${CONTAINER_ID}/workspaces/${WORKSPACE_ID}`;

const token = () => execSync('gcloud auth application-default print-access-token').toString().trim();

async function api(method, path, body) {
    const res = await fetch(`${BASE}${path}`, {
        method,
        headers: {
            Authorization: `Bearer ${token()}`,
            'Content-Type': 'application/json',
            'x-goog-user-project': QUOTA_PROJECT,
        },
        body: body ? JSON.stringify(body) : undefined,
    });
    const text = await res.text();
    if (!res.ok) throw new Error(`${method} ${path} → ${res.status}\n${text}`);
    return text ? JSON.parse(text) : {};
}

const indexByName = (arr, key) => Object.fromEntries((arr || []).map((x) => [x.name, x[key]]));

// ──────────────────────────────────────────────────────────────────────────
// Configuration

const dlv = (varName, dlKey) => ({
    name: varName,
    type: 'v',
    parameter: [
        { type: 'integer', key: 'dataLayerVersion', value: '2' },
        { type: 'boolean', key: 'setDefaultValue', value: 'false' },
        { type: 'template', key: 'name', value: dlKey },
    ],
});

const VARIABLES = [
    dlv('dlv - ecommerce.value', 'ecommerce.value'),
    dlv('dlv - ecommerce.currency', 'ecommerce.currency'),
    dlv('dlv - ecommerce.items', 'ecommerce.items'),
    dlv('dlv - ecommerce.transaction_id', 'ecommerce.transaction_id'),
];

const customEvent = (triggerName, eventName) => ({
    name: triggerName,
    type: 'customEvent',
    customEventFilter: [
        {
            type: 'equals',
            parameter: [
                { type: 'template', key: 'arg0', value: '{{_event}}' },
                { type: 'template', key: 'arg1', value: eventName },
            ],
        },
    ],
});

const ALL_PAGES_TRIGGER = { name: 'All Pages', type: 'pageview' };

const MEWS_EVENTS = [
    'view_item_list',
    'add_to_cart',
    'remove_from_cart',
    'begin_checkout',
    'add_payment_info',
    'select_promotion',
    'purchase',
];

const TRIGGERS = [
    ALL_PAGES_TRIGGER,
    ...MEWS_EVENTS.map((e) => customEvent(`ce - ${e}`, e)),
];

const GA4_GOOGLE_TAG = {
    name: 'GA4 - Google Tag - All Pages',
    type: 'googtag',
    parameter: [{ type: 'template', key: 'tagId', value: GA4_MEASUREMENT_ID }],
    firingTriggerName: 'All Pages',
};

const ecomParam = (name, dlvName) => ({
    type: 'map',
    map: [
        { type: 'template', key: 'name', value: name },
        { type: 'template', key: 'value', value: `{{${dlvName}}}` },
    ],
});

const ga4EventTag = (eventName, friendlyName, extraParams = []) => ({
    name: `GA4 - Event - ${friendlyName}`,
    type: 'gaawe',
    parameter: [
        { type: 'template', key: 'measurementIdOverride', value: GA4_MEASUREMENT_ID },
        { type: 'boolean', key: 'sendEcommerceData', value: 'false' },
        { type: 'template', key: 'eventName', value: eventName },
        {
            type: 'list',
            key: 'eventParameters',
            list: [
                ecomParam('items', 'dlv - ecommerce.items'),
                ecomParam('currency', 'dlv - ecommerce.currency'),
                ecomParam('value', 'dlv - ecommerce.value'),
                ...extraParams,
            ],
        },
    ],
    firingTriggerName: `ce - ${eventName}`,
});

const TRIPTEASE_TAG = {
    name: 'Triptease - Bootstrap',
    type: 'html',
    parameter: [
        {
            type: 'template',
            key: 'html',
            value: `<script src="https://onboard.triptease.io/bootstrap.js?integrationId=${TRIPTEASE_ID}" defer async crossorigin="anonymous" type="text/javascript"></script>`,
        },
        { type: 'boolean', key: 'supportDocumentWrite', value: 'false' },
    ],
    firingTriggerName: 'All Pages',
};

const TAGS = [
    GA4_GOOGLE_TAG,
    ga4EventTag('view_item_list', 'View Item List'),
    ga4EventTag('add_to_cart', 'Add To Cart'),
    ga4EventTag('remove_from_cart', 'Remove From Cart'),
    ga4EventTag('begin_checkout', 'Begin Checkout'),
    ga4EventTag('add_payment_info', 'Add Payment Info'),
    ga4EventTag('select_promotion', 'Select Promotion'),
    ga4EventTag('purchase', 'Purchase', [ecomParam('transaction_id', 'dlv - ecommerce.transaction_id')]),
    TRIPTEASE_TAG,
];

// ──────────────────────────────────────────────────────────────────────────
// Execution

async function main() {
    console.log('Fetching existing workspace contents…');
    const [existingVars, existingTriggers, existingTags] = await Promise.all([
        api('GET', '/variables').then((r) => r.variable || []),
        api('GET', '/triggers').then((r) => r.trigger || []),
        api('GET', '/tags').then((r) => r.tag || []),
    ]);
    const varIds = indexByName(existingVars, 'variableId');
    const trgIds = indexByName(existingTriggers, 'triggerId');
    const tagIds = indexByName(existingTags, 'tagId');

    console.log(`  ${existingVars.length} variables, ${existingTriggers.length} triggers, ${existingTags.length} tags already present.`);

    // 1. Variables
    console.log('\n→ Variables');
    for (const v of VARIABLES) {
        if (varIds[v.name]) {
            console.log(`  ✓ ${v.name} (exists)`);
            continue;
        }
        const created = await api('POST', '/variables', v);
        varIds[v.name] = created.variableId;
        console.log(`  + ${v.name}`);
    }

    // 2. Triggers
    console.log('\n→ Triggers');
    for (const t of TRIGGERS) {
        if (trgIds[t.name]) {
            console.log(`  ✓ ${t.name} (exists)`);
            continue;
        }
        const created = await api('POST', '/triggers', t);
        trgIds[t.name] = created.triggerId;
        console.log(`  + ${t.name}`);
    }

    // 3. Tags
    console.log('\n→ Tags');
    for (const t of TAGS) {
        const { firingTriggerName, ...rest } = t;
        if (tagIds[t.name]) {
            console.log(`  ✓ ${t.name} (exists)`);
            continue;
        }
        const triggerId = trgIds[firingTriggerName];
        if (!triggerId) throw new Error(`Missing trigger "${firingTriggerName}" for tag "${t.name}"`);
        const body = { ...rest, firingTriggerId: [triggerId] };
        const created = await api('POST', '/tags', body);
        tagIds[t.name] = created.tagId;
        console.log(`  + ${t.name}`);
    }

    console.log('\n✅ Done. Review the workspace in GTM, then Preview → Publish.');
    console.log(`   https://tagmanager.google.com/#/container/accounts/${ACCOUNT_ID}/containers/${CONTAINER_ID}/workspaces/${WORKSPACE_ID}`);
}

main().catch((e) => {
    console.error('\n❌ Failed:', e.message);
    process.exit(1);
});
