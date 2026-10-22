from playwright.sync_api import sync_playwright
import os
d=os.getcwd()
tiles=''.join(f'<img src="file://{d}/public/art/{k}.svg" style="width:200px;height:240px;object-fit:cover;display:block">' for k in ['lefkosa','girne','magusa','iskele','guzelyurt','lefke'])
html=f'<html><body style="margin:0;width:1200px;height:240px;display:flex;background:#FAF9F5">{tiles}</body></html>'
open('hdr.html','w').write(html)
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':1200,'height':240}); pg.goto('file://'+d+'/hdr.html'); pg.wait_for_timeout(300)
    pg.screenshot(path='public/email/header.jpg',type='jpeg',quality=85); b.close()
os.remove('hdr.html')
