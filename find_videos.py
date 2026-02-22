import requests
import sys

ids = ["29795179", "31280808", "29241638", "28991665"]
resolutions = ["uhd_3840_2160", "hd_1920_1080", "sd_640_360", "hd_1280_720"]
framerates = ["24fps", "25fps", "30fps", "60fps", "50fps"]

for id in ids:
    found = False
    for res in resolutions:
        for fps in framerates:
            url = f"https://videos.pexels.com/video-files/{id}/{id}-{res}_{fps}.mp4"
            try:
                r = requests.head(url, timeout=2)
                if r.status_code == 200:
                    print(f"FOUND {id}: {url}")
                    found = True
                    break
            except:
                pass
        if found: break
    
    if not found:
        # Try without fps suffix
        for res in resolutions:
            url = f"https://videos.pexels.com/video-files/{id}/{id}-{res}.mp4"
            try:
                r = requests.head(url, timeout=2)
                if r.status_code == 200:
                    print(f"FOUND {id}: {url}")
                    found = True
                    break
            except:
                pass
