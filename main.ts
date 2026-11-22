import{mkdirSync,readdirSync,readFileSync,writeFileSync}from"node:fs";
import{join}from"node:path";
function run(p,q){
 const S=new Int32Array(256),C=new Int32Array(64),M=new Int32Array(256),o=new Uint8Array(65536);
 const F=c=>[o.subarray(0,n),c];
 let s=0,c=0,n=0,i=0,t=0,x=0,v,a,b,r;
 for(;;){
  if(t>=1e6)return F(10);
  if(x<0||x>=p.length)return F(9);
  const y=p[x];t++;
  switch(y){
  case 0:return F(0);
  case 1:
   if(x+1>=p.length)return F(9);
   if(s>255)return F(3);
   S[s++]=(p[x+1]<<24)>>24;x+=2;break;
  case 2:
   if(x+4>=p.length)return F(9);
   if(s>255)return F(3);
   S[s++]=p[x+1]|p[x+2]<<8|p[x+3]<<16|p[x+4]<<24;x+=5;break;
  case 3:if(s<1)return F(2);s--;x++;break;
  case 4:
   if(s<1)return F(2);
   if(s>255)return F(3);
   S[s]=S[s-1];s++;x++;break;
  case 5:
   if(s<2)return F(2);
   v=S[s-1];S[s-1]=S[s-2];S[s-2]=v;x++;break;
  case 6:
   if(s<2)return F(2);
   if(s>255)return F(3);
   S[s]=S[s-2];s++;x++;break;
  case 7:
   if(s<3)return F(2);
   v=S[s-3];S[s-3]=S[s-2];S[s-2]=S[s-1];S[s-1]=v;x++;break;
  case 16:case 17:case 18:case 19:case 20:case 21:case 22:case 24:case 25:case 26:case 28:case 29:case 30:case 32:case 33:case 34:
   if(s<2)return F(2);
   b=S[--s];a=S[s-1];
   if(y==16)r=a+b|0;
   else if(y==17)r=a-b|0;
   else if(y==18)r=Math.imul(a,b);
   else if(y==19){if(!b)return F(4);r=Math.trunc(a/b)|0;}
   else if(y==20){if(!b)return F(4);r=a%b|0;}
   else if(y==21){if(!b)return F(4);r=(a>>>0)/(b>>>0)|0;}
   else if(y==22){if(!b)return F(4);r=(a>>>0)%(b>>>0)|0;}
   else if(y==24)r=a&b;
   else if(y==25)r=a|b;
   else if(y==26)r=a^b;
   else if(y==28)r=a<<b;
   else if(y==29)r=a>>b;
   else if(y==30)r=a>>>b|0;
   else if(y==32)r=a==b?1:0;
   else if(y==33)r=a<b?1:0;
   else r=(a>>>0)<(b>>>0)?1:0;
   S[s-1]=r;x++;break;
  case 23:if(s<1)return F(2);S[s-1]=-S[s-1]|0;x++;break;
  case 27:if(s<1)return F(2);S[s-1]=~S[s-1];x++;break;
  case 48:case 49:case 50:{
   if(x+2>=p.length)return F(9);
   r=(p[x+1]|p[x+2]<<8)<<16>>16;
   if(y==48){x+=3+r;break;}
   if(s<1)return F(2);
   v=S[--s];
   if((y==49)==(v==0))x+=3+r;else x+=3;
   break;}
  case 51:
   if(x+2>=p.length)return F(9);
   if(c>63)return F(7);
   C[c++]=x+3;x=p[x+1]|p[x+2]<<8;break;
  case 52:
   if(!c)return F(8);
   x=C[--c];break;
  case 64:
   if(s<1)return F(2);
   a=S[s-1];
   if(a<0||a>255)return F(6);
   S[s-1]=M[a];x++;break;
  case 65:
   if(s<2)return F(2);
   a=S[--s];v=S[--s];
   if(a<0||a>255)return F(6);
   M[a]=v;x++;break;
  case 80:
   if(s<1)return F(2);
   v=S[--s];a=String(v);
   if(n+a.length>65536)return F(11);
   for(b=0;b<a.length;b++)o[n++]=a.charCodeAt(b);
   x++;break;
  case 81:
   if(s<1)return F(2);
   v=S[--s];
   if(n>65535)return F(11);
   o[n++]=v&255;x++;break;
  case 82:
   if(s>255)return F(3);
   S[s++]=i<q.length?q[i++]:-1;x++;break;
  case 83:
   if(s<1)return F(2);
   return F(S[--s]&255);
  default:return F(5);
  }
 }
}
const I=process.env.MAKEFUN_INPUT_DIR||"/input",O=process.env.MAKEFUN_OUTPUT_DIR||"/output";
for(const id of readdirSync(I).sort()){
 let r;
 try{r=run(readFileSync(join(I,id,"program.bin")),readFileSync(join(I,id,"input.bin")));}catch(e){r=[new Uint8Array(0),0];}
 mkdirSync(join(O,id),{recursive:true});
 writeFileSync(join(O,id,"stdout.bin"),r[0]);
 writeFileSync(join(O,id,"exit.txt"),r[1]+"\n");
}
