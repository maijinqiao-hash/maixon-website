import media from './owner-media.json';
import english from './demos-en.json';
export type DemoCopy = {title:string;summary:string;steps:string[]};
export type Demo = {id:string;feature:string;title:string;summary:string;steps:string[];en?:DemoCopy;path:string;poster:string;duration:number;width:number;height:number};
const copy = [
 {id:'dtf-ai-flow',feature:'dtf',title:'从 AI 制图，到排版与自动蒙泰',summary:'图稿处理好，直接进入白墨烫画排版。检查整版、生成白墨通道，再自动接入 MainTop，让准备工作一路完成。',steps:['在 AI 工作台完成图稿，选择单图排版入口。','根据订单选择等比或不等比，设定尺寸与排列方式。','生成排版，在 Photoshop 检查数量、间距和完整图案。','生成白墨通道与生产文件，自动接入 MainTop 完成后续处理。']},
 {id:'dtf-single',feature:'dtf',title:'单图制图，直接进入蒙泰',summary:'一张图也有完整流程：确定成品尺寸，生成白墨与文件，衔接蒙泰处理。',steps:['在 Photoshop 中打开图稿，进入 DTF 单图制图。','核对尺寸、分辨率、白墨收缩和扩边。','启用自动接入蒙泰，开始制图。','检查处理结果、蒙泰任务与输出位置。']},
 {id:'dtf-count',feature:'dtf',title:'按个数排版，把订单数量排清楚',summary:'按需要的数量重复排列图稿，生成白墨通道后继续进入蒙泰。适合一张图、多件同款的订单。',steps:['打开单图排版，选择个数排版。','输入需要的数量，设置图案尺寸、排版宽度与间距。','生成整版，在 Photoshop 检查数量和边缘。','生成白墨通道、导出文件，接入 MainTop。']},
 {id:'dtf-stretch',feature:'dtf',title:'不等比制图，宽和高分别确定',summary:'需要明确的宽高时，分别设置两个方向。与等比缩放分开选择，让版面符合订单尺寸。',steps:['在单图制图中关闭等比，分别输入目标宽度和高度。','检查图案形状是否符合要求，再设置分辨率、收缩与扩边。','生成图稿后，核对画布与图案尺寸。','完成白墨通道与输出，自动衔接 MainTop。']},
 {id:'dtf-nesting',feature:'dtf',title:'多图异形穿插，旋转安排每一处空间',summary:'把多张不同轮廓的图案放进同一版面，结合旋转与穿插安排位置，让排版更紧凑。',steps:['把待排图稿放入输入文件夹，选择多图排版。','核对排版宽度、图案间距与旋转设置。','生成排版，查看异形图案之间的穿插位置。','检查轮廓、间距与整版尺寸，生成通道后自动接入蒙泰。']},
 {id:'dtf-canvas',feature:'dtf',title:'指定画布裁切，多图排版到自动蒙泰',summary:'先统一画布与图稿处理方式，再自动排列多张图案。完成通道和文件输出后，继续进入蒙泰。',steps:['选择包含多份图稿的文件夹，设置指定画布裁切。','核对尺寸与处理参数，完成图稿整理。','自动排版，在 Photoshop 检查数量、旋转与穿插。','生成通道并导出 TIFF，自动接入 MainTop 继续处理。']},
 {id:'dtf-ai-layout',feature:'ai',title:'AI 图稿，继续做成白墨烫画整版',summary:'在 AI 工作台处理后的图稿，可以继续进入排版、白墨与蒙泰流程，不用重新寻找下一步入口。',steps:['在 AI 工作台确认图稿结果。','选择白墨烫画排版，设置适合订单的排列方式。','检查版面，生成白墨通道和生产文件。','自动接入 MainTop，完成打印前的准备。']},
 {id:'dtg-ai-new',feature:'dtg',title:'AI 图稿到白墨直喷，自动接入蒙泰',summary:'从 AI 工作台进入白墨直喷，选择面料与白墨参数。制图完成后，自动衔接蒙泰并输出任务文件。',steps:['在 AI 工作台处理图稿，继续进入 DTG 白墨直喷。','按面料选择处理方式，确认尺寸与白墨参数。','打开自动接入蒙泰，开始制图。','查看蒙泰处理进度与输出结果，核对打印任务。']},
 {id:'dtg-ai',feature:'dtg',title:'白墨直喷的连续工作流程',summary:'从图像处理、面料选择到通道生成，把白墨直喷的准备与蒙泰处理连在一起。',steps:['完成图稿处理后，选择白墨直喷入口。','核对面料类型、图案尺寸、白墨量与扩边。','开始制图，生成生产文件。','进入 MainTop，检查对应任务与输出。']},
 {id:'sublimation-pdf',feature:'sublimation',title:'PDF 裁片自动排版，从宽度到切割线',summary:'纸张宽度自己定，裁片自动排。自动添加切割线，颜色也能选择，再比较不同排版方案并输出。',steps:['导入 PDF，核对页面与裁片。','按卷材设定纸张宽度，例如 1820 mm；同时核对裁片间距与分卷设置。','按需要添加切割线，并选择清楚易辨的线条颜色。','生成并比较排版方案，检查裁片、切割线与输出文件。']},
 {id:'halftone',feature:'halftone',title:'半色调自动化处理',summary:'从图稿导入到网点效果，调整参数、比较画面，再继续生产。',steps:['导入要处理的图稿。','选择模式，调整尺寸、网点与明暗。','比较处理结果，检查图案层次与边缘。','保存结果或进入后续生产功能。']},
 {id:'maintop-setup',feature:'maintop',title:'自动接入蒙泰，先把设置配好',summary:'打开自动接入蒙泰旁的设置，查看自动匹配的程序、输出目录与 ICC 配置，让后续 DTF、DTG 任务顺畅衔接。',steps:['打开生产模块中自动接入蒙泰旁的设置。','查看软件自动匹配的 MainTop 程序与相关路径。','确认输出位置与 ICC 配置，按生产需要调整。','回到 DTF 或 DTG，启用自动接入并完成一份任务检查。']},
];
export const demos:Demo[]=copy.map(d=>({...d,en:english[d.id as keyof typeof english],...media.find(m=>m.id===d.id)!}));
export function demoById(id:string){const d=demos.find(d=>d.id===id);if(!d)throw new Error(`Unknown demonstration ${id}`);return d;}
export function demoText(d:Demo,locale:string):DemoCopy{return locale==='en'&&d.en?d.en:d;}
export function durationLabel(s:number){return `${Math.floor(s/60)}:${String(Math.round(s%60)).padStart(2,'0')}`;}
export const homeDemo:Record<string,string>={dtf:'dtf-ai-flow',dtg:'dtg-ai-new',sublimation:'sublimation-pdf'};
