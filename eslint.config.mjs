import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

export default [
    ...nextCoreWebVitals,
    {
        ignores: [
            'dist/**',
            'node_modules/**',
            '.next/**',
            'scripts/**',
            'check_errors.cjs',
            'find_videos.py',
        ],
    },
    {
        rules: {
            // Pre-existing mount-tracking pattern (`useEffect(() => setMounted(true), [])`)
            // used for hydration-safe rendering across the app; not a bug to fix in this pass.
            'react-hooks/set-state-in-effect': 'warn',
        },
    },
]
