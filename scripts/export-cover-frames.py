from pathlib import Path
from PIL import Image,ImageEnhance,ImageDraw
import math,json,zipfile
root=Path(__file__).resolve().parents[1]
out=root/'dist/assets/cover-frames';out.mkdir(exist_ok=True)
manifest=[]
for mode in ['software','gaming','software-mobile','gaming-mobile']:
 source=Image.open(root/f'dist/assets/cover-{mode}.png').convert('RGB')
 if mode.endswith('mobile') and source.width>720:source=source.resize((720,round(source.height*720/source.width)),Image.Resampling.LANCZOS)
 for i in range(41):
  t=i*.5
  progress=t/10 if t<=10 else (20-t)/10
  lo,hi=0.0,1.0
  for _ in range(24):
   mid=(lo+hi)/2
   x=3*(1-mid)**2*mid*.42+3*(1-mid)*mid**2*.58+mid**3
   if x<progress:lo=mid
   else:hi=mid
  q=(lo+hi)/2
  wave=3*(1-q)*q*q+q*q*q
  scale=1.015+(.025 if mode.startswith('gaming') else .013)*wave
  w,h=source.size
  scaled=source.resize((round(w*scale),round(h*scale)),Image.Resampling.LANCZOS)
  x=(scaled.width-w)//2;y=(scaled.height-h)//2
  frame=scaled.crop((x,y,x+w,y+h))
  frame=ImageEnhance.Brightness(frame).enhance(1+.07*wave)
  name=f'{mode}-cover-{i:02}.webp';frame.save(out/name,quality=94)
  manifest.append({'mode':mode,'time_seconds':t,'file':name,'scale':scale,'brightness':1+.07*wave})
(out/'manifest.json').write_text(json.dumps({'duration_seconds':20,'fps':2,'note':'Snapshots of the continuous cover loop; entrance fade is separate.','frames':manifest},indent=2))
with zipfile.ZipFile(root/'dist/assets/velun-cover-frames.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in out.iterdir():z.write(f,'velun-cover-frames/'+f.name)
canvas=Image.new('RGB',(1280,768),'#030609');d=ImageDraw.Draw(canvas)
for row,mode in enumerate(['software','gaming']):
 for col,i in enumerate([0,10,20,30]):
  im=Image.open(out/f'{mode}-cover-{i:02}.webp').resize((320,180))
  y=row*220;canvas.paste(im,(col*320,y));d.text((col*320+12,y+187),f'{mode} / {i*.5:.1f}s',fill='#d9c5b5')
canvas.crop((0,0,1280,440)).save(root/'dist/assets/velun-cover-frames.jpg',quality=93)
with zipfile.ZipFile(root/'dist/assets/velun-cover-mobile-frames.zip','w',zipfile.ZIP_DEFLATED) as z:
 for f in out.glob('*-mobile-cover-*.webp'):z.write(f,'velun-cover-mobile-frames/'+f.name)
 z.writestr('manifest.json',json.dumps({'duration_seconds':20,'fps':2,'frames':[f for f in manifest if f['mode'].endswith('mobile')]},indent=2))
print('Exported 164 desktop and mobile cover frames, combined and mobile archives.')
