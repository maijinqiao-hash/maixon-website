import english from './subfeatures-en.json';
import {demos, demoText} from './demos';
import type {V86Locale} from './content';

export type DetailCopy = {title:string;lead:string;summary:string;chapters:{title:string;body:string[]}[];checks:string[]};
export type Subfeature = DetailCopy & {id:string;feature:string;poster:string;video?:string;demo?:string;relatedDemo?:string;secondPoster?:string};
export const subfeatures:Subfeature[] = [
 {feature:'voice',id:'speak',title:'语音输入',lead:'说清要做什么。把要求交给工作台。',summary:'选择图稿后，说出任务、尺寸和单位。识别出的文字可以核对，再继续解析为具体的制图参数。',poster:'voice',secondPoster:'voice-user-input',chapters:[
  {title:'先选图，再表达要求。',body:['拖入图稿，或通过“选择文件”“选择文件夹”指定输入。确认当前任务对应的图稿，再点击“语音作图”。','把功能名称与尺寸一起说清，例如白墨直喷、宽30厘米。涉及分辨率、白墨收缩或扩边时，也把数值和单位说明白。']},
  {title:'识别完成，先看文字。',body:['检查识别结果中的数字、宽高方向和单位。需要更正时，可以直接修改文字，再点击“解析指令”。','嘈杂环境或不方便说话时，使用同一页面的文字输入。解析后仍需检查任务卡片并确认执行。']}
 ],checks:['输入文件与本次订单对应','说清宽度或高度及单位','核对识别文字后再解析']},
 {feature:'voice',id:'type',title:'文字指令作图',lead:'把订单要求，写成一句清楚的话。',summary:'不需要录音，也能表达制图要求。尺寸、分辨率、白墨和扩边一起输入，在执行前查看解析结果。',poster:'voice-user-input',video:'voice',chapters:[
  {title:'写明操作和关键数值。',body:['例如：“帮我做成15厘米宽的DTF单图，300PPI，白墨收缩2像素，每边扩边5毫米。”选择对应图稿后，将要求填入右侧输入框。','一条指令先完成一个明确任务。需要多段处理时，按工作顺序分步提交，更方便检查每一步的结果。']},
  {title:'从文字，变成可检查的参数。',body:['点击“解析指令”，查看识别出的任务和参数。不符合要求时，返回修改文字并重新解析。','确认执行后，检查输出文件。图案宽度与扩边后的画布宽度分别核对，例如15厘米图案左右各扩5毫米，画布约为16厘米。']}
 ],checks:['功能名称明确','数值附带厘米、毫米、像素或 PPI','解析卡片与原要求一致']},
 {feature:'voice',id:'review',title:'参数确认与任务执行',lead:'自动执行之前。先把每个数值看清。',summary:'任务卡片集中显示解析后的操作与参数。确认图稿、尺寸和白墨设置，再执行并查看导出结果。',poster:'voice-confirmation',video:'voice',chapters:[
  {title:'核对当前任务。',body:['确认输入图稿、任务类型、尺寸、分辨率、白墨收缩和扩边。较长的参数卡片需要向下查看完整。','如果解析结果需要调整，先返回修改要求。确认无误后再点击“确认执行”。']},
  {title:'等待完成，检查输出。',body:['使用 Photoshop 的任务，先确认软件连接正常，执行时保持当前工作环境可用。任务完成后打开导出文件，检查画布大小、分辨率和白墨通道。','查看运行记录了解进度或错误。先处理异常原因，再重新执行对应任务。']}
 ],checks:['Photoshop 连接可用','参数卡片已完整核对','输出图稿、通道与尺寸符合订单']},
 {feature:'finder',id:'library',title:'建立本机图库',lead:'先把图库准备好。以后用图片来找。',summary:'选择本地文件夹或外置盘，为自己的图稿建立检索数据。原图留在原来的位置，索引和预览保存在本机。',poster:'finder-management',video:'finder',chapters:[
  {title:'选择文件夹或整盘。',body:['打开“图库管理”，点击“选择文件夹或整盘”，指定需要检索的图稿位置。外置硬盘需保持连接，路径应能正常访问。','首次处理会读取文件并建立检索数据。所需时间与图稿数量、文件大小和磁盘速度有关。']},
  {title:'看完成状态，也看可用数量。',body:['等图库处理完成，检查“可正常找图”与“暂时不能使用”的数量。图库扫描与当前图片检索分别显示进度。','先用一张已知图稿验证查找流程，再扩大图库范围。无法读取的文件可查看下方状态与原因。']}
 ],checks:['图库路径可访问','首次处理已完成','可正常找图的数量大于零']},
 {feature:'finder',id:'image-search',title:'以图找图',lead:'记得画面。就能从画面开始找。',summary:'把参考图放入找图工作台，在已准备的图库中检索相似图稿，比较候选画面并定位原文件。',poster:'finder',video:'finder',chapters:[
  {title:'放入参考图，开始检索。',body:['先选择已准备完成的图库，再导入要查找的参考图片。确认参考图正确后，点击“开始检索”。','图库准备与图片检索是两个步骤。选择好图库后，需要主动开始本次检索。']},
  {title:'比较候选，找回原稿。',body:['检查图案主体、文字和细节，结合匹配区域判断候选是否对应。随后定位原文件，确认完整画面和文件质量。','如果服装、背景或其他物体占比太大，可以切换到局部找图，框选需要的印花区域继续查找。']}
 ],checks:['参考图清楚可辨','候选细节与参考一致','原文件完整且适合后续处理']},
 {feature:'finder',id:'region-search',title:'局部印花检索',lead:'只找这块图案。把干扰留在框外。',summary:'在参考图片中框选印花区域，减少衣服、背景和其他元素对检索的影响，再对照候选的对应位置。',poster:'finder-region',video:'finder',chapters:[
  {title:'框住真正要找的部分。',body:['载入参考图后，选择需要检索的印花范围。尽量保留有辨识度的文字、轮廓和纹理，同时减少无关背景。','不要把框缩得只剩通用颜色或很小的纹理；适当保留图案上下文，方便区分相似设计。']},
  {title:'看局部，也核对整张原图。',body:['开始检索，比较候选中的匹配区域。找到接近的图稿后，打开原文件核对完整内容。','有需要时重新选择区域再次检索。相似结果用于缩小范围，最终仍应按原稿细节确认。']}
 ],checks:['框选范围包含主要特征','无关背景尽量排除','匹配区域与原稿均已核对']},
 {feature:'finder',id:'maintenance',title:'图库更新与质量重建',lead:'图库在增加。检索数据也跟得上。',summary:'检查新增、修改和删除的文件，了解暂时不能使用的图稿，按需要进行质量重建。',poster:'finder-management',chapters:[
  {title:'图稿变了，检查一次变化。',body:['添加、修改或移走图稿后，在“图库管理”点击“检查新增、修改和删除”，更新当前图库的检索数据。','扫描时可以查看进度，以及文件状态与变化。需要中断时，使用页面中的暂停、继续或停止控件。']},
  {title:'按状态处理不可用文件。',body:['查看暂时不能参与找图、格式不支持或无法完整读取的位置。先确认路径和文件本身能否正常打开。','对于无法读取的 PSD，可保留原稿并导出 RGB 参考图用于查找。“质量重建”用于重新准备检索数据，开始前先确认所选图库。']}
 ],checks:['选中需要维护的图库','检查不可用文件的具体状态','完成更新后再开始检索']},
 {feature:'finder',id:'backup',title:'保存位置与外置盘备份',lead:'本机保存。也可以多留一份备份。',summary:'查看索引和预览的本机保存位置，按需要开启外置盘备份。原始图稿另行保管。',poster:'finder-storage',chapters:[
  {title:'找到本机保存位置。',body:['在“保存与备份”查看索引与预览的保存路径。点击“打开本机保存文件夹”，可以定位对应目录。','本机索引会保留，日常找图使用这些数据。原图仍保存在自己的图库文件夹里。']},
  {title:'设置外置盘备份。',body:['连接外置盘，点击“选择备份位置”并核对目标，再按需要启用备份。检查页面状态，确认目标位置可用。','这项备份包含索引和本机预览，不包含客户原稿，也不包含这台电脑的找图记录。重要原稿需要另做文件备份。']}
 ],checks:['备份目标可访问','启用状态与实际需要一致','原始图稿另有备份']},
 {feature:'finder',id:'records',title:'本机找图记录',lead:'回看做过的查找。理清这次工作的经过。',summary:'通过找图页面的“本机记录”入口查看本机记录；维护图库时，再结合文件状态与处理进度检查。',poster:'finder-management',chapters:[
  {title:'进入本机记录。',body:['打开 MAIXON 找图，切换顶部的“本机记录”。这个入口与“图库管理”“保存与备份”并列，方便在查找后回看。','需要排查图稿未出现的原因时，同时检查图库是否准备完成、参考图是否正确，以及不可用文件状态。']},
  {title:'记录与图稿分别管理。',body:['本机记录用于回看这台电脑的查找过程；索引、预览和原始图稿是不同的内容。','外置盘备份不包含本机找图记录。更换电脑或整理文件时，先确认需要保留的原稿和数据。']}
 ],checks:['从本机记录入口查看','结合当前图库状态判断','区分记录、索引和原始图稿']},
 {feature:'ai',id:'extract',title:'提取印花',lead:'喜欢的图案。从参考画面里走出来。',summary:'从服装、实物或参考图片中提取印花，选择提取方案和清晰度，按需要同时去除背景。',poster:'ai-sample-extract',video:'ai-extract',relatedDemo:'dtf-ai-layout',chapters:[
  {title:'选择图稿与提取方案。',body:['在 AI 工作台选择“提取印花”，导入参考图片。尽量让目标图案完整、清楚，减少遮挡。','按图案与用途选择方案和清晰度。需要透明背景时，核对自动抠图选项及提交前的点数提示。']},
  {title:'对比图案，再继续制作。',body:['完成后切换原图、对比和结果，查看文字、轮廓和细节。拖动对比线，逐个检查需要保留的部分。','保存结果，或继续使用处理结果进入下一步。需要制图排版时，再设置实际成品尺寸和白墨参数。']}
 ],checks:['主体图案完整','文字与细节正确','背景与后续用途一致']},
 {feature:'ai',id:'cutout',title:'印花抠图',lead:'留下印花。让背景干净退场。',summary:'去除图稿背景，比较细小镂空、文字和边缘，保存透明图片，继续制图或排版。',poster:'ai-sample-cutout',video:'ai-cutout',relatedDemo:'dtf-ai-layout',chapters:[
  {title:'明确哪些部分需要保留。',body:['选择“印花抠图”，导入图稿，并查看当前方案和点数提示。确认主体与需要保留的白色细节后开始处理。','与裁切不同，抠图处理的是背景和透明区域。已有完整构图时，可直接围绕背景清理进行检查。']},
  {title:'放大检查透明边缘。',body:['在前后对比中查看发丝、细线、文字内孔和图案周边。保存透明图片后，换深浅背景检查是否还有残留。','确认图案完整再进入 DTF、DTG 或半色调处理，按新的生产任务核对尺寸和通道。']}
 ],checks:['背景透明符合要求','细线与内部镂空完整','没有误删需要保留的白色部分']},
 {feature:'ai',id:'upscale',title:'AI 变清晰',lead:'放大图稿。也把细节看仔细。',summary:'选择 2×、4× 或 6× 放大，比较文字、线条与纹理，保存后核对实际像素尺寸。',poster:'ai-sample-upscale',video:'ai-upscale',chapters:[
  {title:'按需要选择倍数。',body:['打开“AI 变清晰”，载入图稿，选择适合用途的放大倍数。提交前查看本次设置与点数。','更大的倍数会带来更大的图像，不代表所有原本模糊的文字都能正确恢复。先根据原图情况选择。']},
  {title:'对比细节，核对输出尺寸。',body:['完成后放大查看文字、细线、纹理与边缘。使用前后对比确认细节变化是否符合原设计。','保存结果并检查实际像素尺寸。进入生产模块后，成品厘米数与 PPI 仍需按订单设置。']}
 ],checks:['放大倍数适合用途','文字和轮廓没有错误变化','输出像素与生产尺寸分别核对']},
 {feature:'ai',id:'edit',title:'用指令改图',lead:'想改哪里。写得明明白白。',summary:'用文字描述颜色、元素或画面细节的修改，同时说明需要保留的内容，再对照结果检查。',poster:'ai-sample-edit',video:'ai-edit',chapters:[
  {title:'同时说明修改与保留。',body:['选择“用指令改图”，载入原图，写清要修改的部位和希望得到的结果。主体、文字或构图需要保留时，也在指令里说明。','优先提交明确、可检查的变化。多个修改可以分步进行，方便对照每次结果。']},
  {title:'确认后，再继续处理。',body:['切换原图、对比和结果，检查改动是否到位，也检查其他部分是否保持完整。','保存满意的结果，再用于下一次处理或生产。需要继续修改时，先确认当前输入是不是刚刚得到的图稿。']}
 ],checks:['要求指向明确区域或元素','需要保留的内容已说明','改动与未改部分都已检查']},
 {feature:'ai',id:'expand',title:'AI 扩图',lead:'画面之外。再留一点空间。',summary:'分别设置上、下、左、右的扩展范围，让图稿适应新的画布比例，并检查生成部分的衔接。',poster:'ai-sample-expand',video:'ai-expand',chapters:[
  {title:'确定四个方向的扩展。',body:['选择“AI 扩图”，导入图片。按画布需要分别设置四边增加的像素，查看当前输入和提交点数。','只需要某一方向时，集中调整对应边。先明确目标画布，再决定扩展范围。']},
  {title:'检查新旧画面的连接。',body:['比较结果与原图，重点查看延伸区域、边界接缝、图形重复和文字。扩出的内容需与原构图协调。','保存后核对新像素尺寸。扩图改变的是图像范围，生产中的成品尺寸仍由后续制图设置确定。']}
 ],checks:['四边扩展范围正确','生成区域与原画面衔接自然','保存后的完整尺寸符合需要']},
 {feature:'ai',id:'crop',title:'印花裁切',lead:'把需要的印花。留在合适的范围里。',summary:'整理图稿边界，裁出需要的印花主体。需要透明背景时，再接着使用印花抠图。',poster:'ai-sample-crop',video:'ai-crop',chapters:[
  {title:'先整理范围。',body:['选择“印花裁切”，导入图片并开始处理。裁切用于整理图案的画面范围，背景处理可按下一步用途单独安排。','检查图案四周的边界，确保文字、线条和装饰元素没有被切掉。']},
  {title:'根据结果选择下一步。',body:['对比原图与结果，确认主体完整、留白合适。保存后可以继续抠图、放大或进入生产流程。','每次切换工具都重新核对当前输入，确保接续的是已经确认的结果。']}
 ],checks:['主体与文字完整','四周边界合适','是否需要透明背景已确认']},
 {feature:'ai',id:'vector',title:'转矢量',lead:'从像素图。到可继续编辑的线条。',summary:'将图稿转换为 SVG 矢量结果，检查轮廓、细节和颜色，保存后继续编辑。',poster:'ai-sample-vector',video:'ai-vector',chapters:[
  {title:'选择清楚的输入图。',body:['打开“转矢量”，导入需要转换的图稿，查看本次处理设置和点数后提交。','文字、细线和复杂渐变都需要在结果中单独查看，不能只凭缩略图判断完成质量。']},
  {title:'放大查看，保存 SVG。',body:['处理完成后比较轮廓和配色。将 SVG 保存并在适合的矢量编辑软件中打开，检查路径与细节。','需要进入印刷制图时，按后续功能支持的格式与尺寸准备输入，再核对最终生产文件。']}
 ],checks:['外轮廓与细节完整','颜色与原设计一致','SVG 可以正常打开编辑']},
 {feature:'halftone',id:'modes',title:'半色调处理模式',lead:'保留层次。或让网点铺开。',summary:'选择处理模式，比较“保留层次”与“全图网点”的效果，让图案按需要呈现。',poster:'halftone',demo:'halftone',chapters:[
  {title:'导入图稿，选择模式。',body:['通过文件导入图稿，或读取 Photoshop 当前图。确认要处理的内容，再选择对应的处理模式。','需要透明背景时，可以先在 AI 工作台完成抠图，保存透明图稿后进入半色调。']},
  {title:'比较两种网点效果。',body:['在“保留层次”和“全图网点”之间切换，观察明暗和细节。结合成品宽度与网点疏密判断效果。','完成选择后，继续调整参数并在 Photoshop 中查看成品大小下的表现。']}
 ],checks:['输入图稿正确','处理模式符合效果要求','前后层次与边缘已比较']},
 {feature:'halftone',id:'settings',title:'网点、明暗与更多参数',lead:'每一个点。都有合适的分寸。',summary:'把成品宽度、LPI、明暗与分辨率一起核对，再展开网角、直径倍率和去黑阈值等设置。',poster:'halftone-more',video:'halftone',chapters:[
  {title:'先定尺寸，再看网点。',body:['先输入实际成品宽度，再调整 LPI。LPI 表示网点疏密，PPI 表示图像分辨率，两者分别设置。','比较明暗调整与网点效果。改变成品尺寸后，应重新查看网点表现。']},
  {title:'展开更多设置。',body:['按需要检查分辨率、网角、直径倍率和去黑阈值。每次调整一项，比较它对轮廓和层次的影响。','保存处理结果并在成品大小下检查，再结合实际打样确定生产参数。']}
 ],checks:['成品尺寸与订单一致','LPI 与 PPI 分开核对','小文字、边缘和明暗层次清楚']},
 {feature:'halftone',id:'production',title:'半色调接入制图',lead:'网点处理好。下一步直接继续。',summary:'在 Photoshop 中打开结果，或转入 DTF、DTG，接着完成尺寸、白墨和生产文件。',poster:'halftone-more',demo:'halftone',chapters:[
  {title:'查看结果，再选生产入口。',body:['点击“在 PS 中打开”，检查图稿细节和实际尺寸。根据订单选择“转入 DTF”或“转入 DTG”。','半色调决定图像网点效果。进入生产模块后，白墨量、收缩和扩边仍按对应任务确认。']},
  {title:'接着输出与衔接蒙泰。',body:['在制图模块检查参数，生成彩色与白墨通道。排版任务还需要检查数量、间距和完整边缘。','按需要启用自动接入 MainTop，继续完成打印前的文件准备。']}
 ],checks:['网点效果已确认','生产模块与订单类型一致','白墨与输出参数已核对']},
 {feature:'dtf',id:'area-layout',title:'平方米单图排版',lead:'按面积安排整版。每一步都有确认。',summary:'为同一图案设置最大排版宽度、面积、尺寸与扩边。先生成版面，再生成 W1 并导出 TIFF。',poster:'dtf-single-layout',video:'dtf',relatedDemo:'dtf-count',chapters:[
  {title:'设置重复图案与版面边界。',body:['在“单图排版”选择平方米排版。核对等比或不等比、图稿尺寸、最大排版宽度、四周扩边、旋转角度和目标面积。','检查软件换算出的高度是否适合图稿。只有足够放下完整图案的版面，才能得到符合要求的排版。']},
  {title:'先看整版，再生成白墨。',body:['点击“生成排版”，在 Photoshop 中检查行列、数量、间距与图案完整性。此阶段先完成排版。','确认当前文档为排版稿，再检查右侧分辨率和 W1 收缩，点击“生成 W1 并导出 TIFF”。这一阶段整版不再扩边。']}
 ],checks:['面积与最大宽度设置正确','排版能容纳完整图案','确认排版后再生成通道与导出']},
 {feature:'dtf',id:'white-edges',title:'白墨收缩与四周扩边',lead:'图案边缘。白墨和留边分别照顾。',summary:'W1 收缩控制白墨边缘，四周扩边增加画布留边。按像素与毫米分别输入，检查图案和画布尺寸。',poster:'dtf',video:'dtf',relatedDemo:'dtf-single',chapters:[
  {title:'分清两个单位。',body:['W1 收缩使用像素，图像四周扩边使用毫米。它们分别影响白墨边缘与画布范围，不能按同一个数值理解。','先确定图案尺寸和 PPI，再按订单与打样经验设置收缩和扩边。']},
  {title:'在文件里看实际结果。',body:['例如图案宽15厘米，左右各扩5毫米，最终画布宽约16厘米。检查时同时看图案大小和画布大小。','打开输出文件，单独查看 W1 与彩色图稿的边缘关系，核对细字和线条后再继续生产。']}
 ],checks:['收缩使用像素','每边扩边使用毫米','彩色图稿与 W1 边缘分别检查']},
 {feature:'dtf',id:'output',title:'快捷制图与 TIFF 输出',lead:'把成品要求。落实到输出文件里。',summary:'选择小标或标准快捷设置，核对分辨率、LZW 无损压缩和 CMYK ICC，生成带 W1 的生产文件。',poster:'dtf-more',video:'dtf',relatedDemo:'dtf-single',chapters:[
  {title:'从快捷设置开始核对。',body:['“小标 · 2000 PPI”和“标准 · 300 PPI”提供快捷入口。选择后仍需按成品用途核对尺寸、分辨率、旋转和边缘参数。','设置独立的导出位置，保留原始文件，方便区分原稿与生产结果。']},
  {title:'展开输出选项。',body:['按工作流程检查 LZW 无损压缩与嵌入 CMYK ICC。确认 Photoshop 当前图稿后，开始制图并导出 TIFF。','打开文件，检查 CMYK、W1、PPI 和画布尺寸。需要继续接入蒙泰时，再核对 MainTop 的相关设置与输出任务。']}
 ],checks:['快捷设置已按订单复核','压缩和 ICC 选项符合流程','TIFF、CMYK 与 W1 已检查']},
 {feature:'dtg',id:'dark-fabric',title:'深色面料制图',lead:'让面料底色。参与图案的表达。',summary:'选择深色面料方案，分别设置普通区域与黑色区域白墨，再完成尺寸、通道和输出。',poster:'dtg',demo:'dtg-ai-new',chapters:[
  {title:'选择深色面料方案。',body:['打开当前 Photoshop 图稿，进入白墨直喷，选择“深色面料”。根据实际面料与设计确定处理方案。','普通区域白墨和黑色区域白墨分别设置，结合面料底色与所需覆盖效果调整。']},
  {title:'核对图案与白墨。',body:['确认通道名称、图案宽度、PPI、W1 收缩和每边扩边，选择输出目录后开始制图。','完成后同时查看彩色图稿与白墨通道，再继续进入 MainTop 并按实际面料打样。']}
 ],checks:['实际面料适合深色方案','两类区域白墨分别设置','通道与图案覆盖关系符合要求']},
 {feature:'dtg',id:'light-fabric',title:'浅色面料制图',lead:'浅色面料。也有自己的处理方式。',summary:'选择浅色面料方案，设置普通区域白墨，按图稿决定是否移除白色背景，再输出生产文件。',poster:'dtg-light-fabric',video:'dtg',relatedDemo:'dtg-ai',chapters:[
  {title:'选择浅色，检查白色背景。',body:['在白墨直喷中选择“浅色面料”，核对普通区域白墨量。根据原稿和设计，决定是否开启“移除白色背景”。','白色背景与设计中需要保留的白色元素要区分。处理后检查主体和细节是否完整。']},
  {title:'继续设置尺寸与通道。',body:['核对通道名称、指定宽度、分辨率、W1 收缩和每边扩边。输出后查看彩色与白墨层。','需要自动接入蒙泰时，检查对应配置，再确认 MainTop 中的任务与实际面料要求一致。']}
 ],checks:['浅色面料方案选择正确','移除白色背景符合设计','细节和需要保留的白色部分完整']},
 {feature:'dtg',id:'white-ink',title:'分区控制白墨量',lead:'普通区域与黑色区域。白墨分别控制。',summary:'根据面料与图案需要，为不同区域安排白墨底层。白墨百分比与彩色图案的透明度分别理解。',poster:'dtg',video:'dtg',secondPoster:'dtg-light-fabric',chapters:[
  {title:'深色面料下的两类区域。',body:['普通区域白墨量与黑色区域白墨量可以分别设置，让面料底色和白墨覆盖按图案需要配合。','“黑色区域白墨5%”指该区域的白墨底层量，不是删掉95%的彩色图案，也不是将整张图透明度改成5%。']},
  {title:'根据面料检查实际覆盖。',body:['切换面料方案时，重新查看可用设置。浅色方案提供普通区域白墨和移除白色背景的选项。','在 Photoshop 中检查彩色和 W1，再结合墨水、设备与实际面料打样决定白墨量。']}
 ],checks:['白墨量与彩色处理分开理解','面料方案对应的设置已核对','实际覆盖通过打样确认']},
 {feature:'dtg',id:'output',title:'尺寸、白墨通道与输出',lead:'彩色和白墨。一起准备到位。',summary:'设置成品宽度、PPI、W1 收缩、扩边和通道名称，生成文件后衔接 MainTop。',poster:'dtg',video:'dtg',relatedDemo:'dtg-ai-new',chapters:[
  {title:'先核对 Photoshop 当前图。',body:['确认正在处理的是本次订单图稿。按生产要求指定宽度，核对分辨率、白墨通道名称、收缩和每边扩边。','通道名称要与后续 RIP 流程对应。W1 收缩以像素计，扩边以毫米计。']},
  {title:'生成文件，再接入蒙泰。',body:['选择导出目录，开始制图。完成后打开文件，核对尺寸、彩色图稿和白墨通道。','启用自动接入 MainTop 后，继续查看对应任务、输出位置和 RIP 结果，再准备打印。']}
 ],checks:['当前图稿对应订单','通道名称符合 RIP 设置','图稿尺寸与扩边后画布分别核对']},
 {feature:'sublimation',id:'psd-pieces',title:'PSD／PSB 裁片排版',lead:'Photoshop 里的裁片。接着排成一整卷。',summary:'选择 PSD／PSB 文件夹，按实际卷材设置宽度、间距和方向，比较三种方案并导出 CMYK TIFF。',poster:'sublimation-psd',video:'sublimation-psd',chapters:[
  {title:'按图稿来源选择入口。',body:['进入“PSD / PSB 裁片”，选择包含待排文件的文件夹，确认裁片数量与内容。','设置卷材宽度、裁片净间距、单卷最大高度和 TIFF 分辨率。需要限制方向时，检查是否允许180°旋转。']},
  {title:'比较方案，完成输出。',body:['按需要开启裁切线并选择颜色，生成快速、均衡和最省料方案。逐个比较方向、利用率与分卷。','确认所选方案后导出 CMYK TIFF，打开文件检查裁片完整性、实际宽度和边界。']}
 ],checks:['输入文件夹与裁片数量正确','卷材与旋转设置符合材料要求','所选方案及导出尺寸已核对']},
 {feature:'sublimation',id:'cut-lines',title:'自动切割线与颜色',lead:'轮廓自动加。颜色由你选。',summary:'按裁切需要开启切割线，选择与图稿容易区分的颜色，并核对外扩和裁片间距。',poster:'sublimation-more',demo:'sublimation-pdf',chapters:[
  {title:'开启切割线，选择颜色。',body:['导入文件后，打开“裁切线”开关，再点击“裁切线颜色”选择适合的线条颜色。','纸张宽度可以按卷材自行设定，例如1820毫米。切割线与裁片间距一起考虑，让后续裁切更清楚。']},
  {title:'核对轮廓和外扩。',body:['PDF 的更多设置中可以检查裁切线外扩。根据裁切要求设置后，生成方案并查看每一片轮廓。','输出前检查线条是否完整、颜色是否清楚、邻近裁片是否保留所需间距。']}
 ],checks:['裁切线开关符合生产需要','颜色与图稿清楚区分','外扩、轮廓与间距已检查']},
 {feature:'sublimation',id:'layout-options',title:'纸张宽度与排版方案',lead:'按实际纸宽。比较更合适的排法。',summary:'自定义卷材宽度、裁片间距和方向规则，比较快速、均衡与最省料方案，再决定采用哪一版。',poster:'sublimation-more',demo:'sublimation-pdf',chapters:[
  {title:'定义可用版面。',body:['输入实际纸张宽度，例如1820毫米，再核对裁片净间距和单卷最大高度。不同纸宽可以直接输入对应数值。','有布纹或单向图案时，检查旋转规则。PDF 更多设置提供旋转规则、自由旋转步进和优化次数等控制。']},
  {title:'三种方案，逐个比较。',body:['生成快速、均衡和最省料方案后，查看裁片数量、卷数、排版高度与利用率。最省料方案可能需要更长计算时间。','结合裁片方向、裁切方便程度和实际用料选择。确认方案完成后，再打开查看或导出。']}
 ],checks:['纸宽与实际可用卷材一致','方向规则适合布纹与图案','方案已完成且裁片完整']},
 {feature:'sublimation',id:'export',title:'分卷检查与文件输出',lead:'排得好。也要输出得清楚。',summary:'按生产边界检查裁片与分卷，确认所选方案，核对 PDF 或 TIFF 等输出入口与导出位置。',poster:'sublimation',video:'sublimation',secondPoster:'sublimation-psd',chapters:[
  {title:'先确认方案和分卷。',body:['设置单卷最大高度后，检查结果中的裁片数、卷数和分卷边界。放大查看每一片是否完整、是否相碰。','确认旋转方向、间距与切割线颜色，选定需要输出的方案。']},
  {title:'按入口导出文件。',body:['PDF 排版页面提供查看、打开 PDF、用 EPS 打印及 Photoshop TIFF 导出入口；PSD／PSB 裁片可导出 CMYK TIFF。按当前任务选择对应入口。','打开导出文件夹，检查实际文件的尺寸、分辨率、裁片数量和轮廓。确认后继续后续生产。']}
 ],checks:['卷数与分卷边界符合要求','输出的是已确认的方案','文件尺寸、裁片和线条完整']},
];

export function subfeatureCopy(item:Subfeature,locale:V86Locale):DetailCopy {
 if(locale==='zh-CN')return item;
 const copy=(english as Record<string,DetailCopy>)[`${item.feature}/${item.id}`];
 if(!copy)throw new Error(`Missing English detail: ${item.feature}/${item.id}`);
 return copy;
}
export type DetailLink={title:string;summary:string;href:string;image:string};
export function detailLinks(feature:string,locale:V86Locale):DetailLink[]{
 const own=subfeatures.filter(s=>s.feature===feature).map(s=>{const t=subfeatureCopy(s,locale);return {title:t.title,summary:t.summary,href:`/${locale}/features/${feature}/${s.id}/`,image:`/media/v86/screenshots/light/${s.poster}.webp`};});
 const workflows=demos.filter(d=>d.feature===feature).map(d=>{const t=demoText(d,locale);return {title:t.title,summary:t.summary,href:`/${locale}/workflows/${d.id}/`,image:`/media/v86/owner/${d.id}.webp`};});
 const result=feature==='dtf'?[...workflows,...own]:[...own,...workflows];
 if(['dtf','dtg'].includes(feature))result.push({title:locale==='zh-CN'?'自动接入蒙泰':'Automatic MainTop integration',summary:locale==='zh-CN'?'图稿、白墨与文件准备完成，自动衔接 MainTop。':'Continue from artwork, white ink and file output into MainTop.',href:`/${locale}/features/${feature}/maintop/`,image:`/media/v86/owner/${feature==='dtf'?'dtf-ai-flow':'dtg-ai-new'}.webp`});
 return result;
}
