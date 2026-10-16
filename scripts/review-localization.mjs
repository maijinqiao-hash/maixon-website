import fs from 'node:fs/promises';
const reviewed={
 'Before you print.':['ก่อนเริ่มพิมพ์','印刷の前に。','인쇄하기 전에.'],
 'Bring it all together.':['จบทุกขั้นตอนในที่เดียว','すべてを、ひとつの流れに。','모든 준비를 하나의 흐름으로.'],
 'From finding artwork to preparing the final layout.':['ตั้งแต่ค้นหาแบบ เตรียมภาพ จนถึงจัดวางงานพร้อมพิมพ์','図案の検索から、印刷用レイアウトの準備まで。','도안 찾기부터 최종 인쇄 배치까지.'],
 'Your prepress workflow, in one workspace.':['รวมงานเตรียมพิมพ์ไว้ในเวิร์กสเปซเดียว','印刷前の作業を、ひとつのワークスペースで。','인쇄 전 작업을 하나의 작업 공간에서.'],
 'Software':['ซอฟต์แวร์','ソフトウェア','소프트웨어'],
 'Hardware':['อุปกรณ์','ハードウェア','하드웨어'],
 'Support':['ช่วยเหลือ','サポート','고객 지원'],
 'Download':['ดาวน์โหลด','ダウンロード','다운로드'],
 'Choose language':['เลือกภาษา','言語を選択','언어 선택'],
 'Discover MainTop integration':['รู้จักการเชื่อมต่อ MainTop อัตโนมัติ','MainTop 自動連携を知る','MainTop 자동 연동 알아보기'],
 'MAIXON home':['หน้าแรก MAIXON','MAIXON ホーム','MAIXON 홈'],
 'Extract Print':['แยกลายพิมพ์','図案抽出','도안 추출'],
 'Enhance Detail':['เพิ่มความคมชัด','高画質化','선명도 향상'],
 'Crop Print':['ครอบตัดลายพิมพ์','図案の切り抜き','도안 자르기'],
 'Vectorize':['แปลงเป็นเวกเตอร์','ベクター化','벡터화'],
 'Say what you need.':['บอกงานที่ต้องการ','やりたいことを、言葉に。','원하는 작업을 말하세요.'],
 'Put every setting in place.':['ให้ทุกค่าพร้อมทำงาน','必要な設定を、ひとつずつ。','필요한 설정을 한 번에.'],
 'Remember the picture.':['จำภาพได้','画像を覚えていれば。','이미지는 기억나는데.'],
 'Forget the filename.':['ไม่ต้องจำชื่อไฟล์','ファイル名は、忘れても。','파일 이름은 몰라도.'],
 'Give every tone':['ให้ทุกเฉดสี','色の階調を、','색의 계조를,'],
 'room to breathe.':['คงมิติด้วยฮาล์ฟโทน','ハーフトーンで美しく。','하프톤으로 자연스럽게.'],
 'Artwork, white ink and MainTop. Connected.':['ภาพ หมึกขาว และ MainTop เชื่อมต่อเป็นขั้นตอนเดียว','図案、白インク、MainTop。ひとつの流れに。','도안, 흰색 잉크, MainTop을 하나의 흐름으로.'],
 'From artwork to the next production run.':['จากภาพต้นฉบับ สู่การผลิตครั้งต่อไป','図案から、次の生産へ。','도안에서 다음 생산까지.'],
 'A smoother layout, together.':['จัดวางงานได้คล่องขึ้นไปด้วยกัน','レイアウトも、一緒にスムーズに。','함께 더 편리하게 배치하세요.'],
 'Focus on the artwork. Feel comfortable at work.':['ใส่ใจกับภาพ ทำงานได้อย่างสบาย','図案に集中。作業は心地よく。','도안에 집중하고 편안하게 작업하세요.'],
 'Say what you need. Keep moving.':['บอกงานที่ต้องการ แล้วทำต่อได้เลย','言葉で伝えて、次の作業へ。','원하는 작업을 말하고 다음 단계로.'],
 'Colleagues reviewing artwork in a print studio with the light MAIXON TOOL interface.':['เพื่อนร่วมงานตรวจดูภาพในสตูดิโอพิมพ์ โดยหน้าจอแสดง MAIXON TOOL ธีมสว่าง','プリントスタジオで図案を確認するスタッフ。画面は MAIXON TOOL のライトテーマ。','프린트 스튜디오에서 도안을 확인하는 동료들과 MAIXON TOOL 라이트 테마 화면.'],
 'Colleagues working at a computer with the light MAIXON TOOL multi-image layout interface.':['เพื่อนร่วมงานจัดวางภาพที่คอมพิวเตอร์ โดยหน้าจอแสดงการจัดวางหลายภาพของ MAIXON TOOL ธีมสว่าง','パソコンでレイアウトを操作するスタッフ。画面は MAIXON TOOL のライトテーマの複数画像レイアウト。','컴퓨터에서 배치 작업을 하는 동료들과 MAIXON TOOL 라이트 테마의 여러 이미지 배치 화면.'],
 'Colleagues viewing the dark MAIXON TOOL AI Workbench in an evening print studio.':['เพื่อนร่วมงานดูเวิร์กสเปซ AI ของ MAIXON TOOL ธีมมืด ในสตูดิโอพิมพ์ยามเย็น','夕方のプリントスタジオで MAIXON TOOL のダークテーマの AI ワークスペースを見るスタッフ。','저녁 프린트 스튜디오에서 MAIXON TOOL 다크 테마의 AI 작업실을 보는 동료들.'],
 'An operator using voice input at a computer with the light MAIXON TOOL Voice Commands interface.':['ผู้ใช้สั่งงานด้วยเสียงที่คอมพิวเตอร์ โดยหน้าจอแสดง MAIXON TOOL ธีมสว่าง','パソコンで音声入力するスタッフ。画面は MAIXON TOOL のライトテーマの音声コマンド。','컴퓨터에서 음성으로 작업을 지시하는 사용자와 MAIXON TOOL 라이트 테마의 음성 명령 화면.'],
 '≈ +200 mm':['≈ +200 มม.','≈ +200 mm','≈ +200 mm'],
 'Light':['โหมดสว่าง','ライト','라이트'],
 'Dark':['โหมดมืด','ダーク','다크'],
 'Voice Commands':['สั่งงานด้วยเสียง','音声コマンド','음성 명령'],
 'MAIXON Image Finder':['MAIXON ค้นหารูปภาพ','MAIXON 画像検索','MAIXON 이미지 검색'],
 'AI Workbench':['เวิร์กสเปซ AI','AI ワークスペース','AI 작업실'],
 'Halftone':['ฮาล์ฟโทน','ハーフトーン','하프톤'],
 'Sublimation':['พิมพ์ซับลิเมชัน','昇華転写','승화전사'],
 'Understand your access.':['เข้าใจสิทธิ์การใช้งานก่อนเริ่มต้น','ご利用条件をご確認ください。','사용 권한을 먼저 확인하세요.'],
 'Worldwide access. Register by email.':['เปิดให้ใช้ทั่วโลก สมัครด้วยอีเมล','世界中で利用可能。メールアドレスで登録。','전 세계에서 이용 가능. 이메일로 가입.'],
 'MAIXON TOOL is available to users worldwide. Register with your email address, then sign in to review trials, licenses and AI credits.':['ผู้ใช้ทั่วโลกสามารถใช้ MAIXON TOOL ได้ สมัครด้วยอีเมล แล้วเข้าสู่ระบบเพื่อดูสิทธิ์ทดลองใช้ ไลเซนส์ และเครดิต AI','MAIXON TOOL は世界中のユーザーが利用できます。メールアドレスで登録し、ログインすると試用期間、ライセンス、AI ポイントを確認できます。','MAIXON TOOL은 전 세계 사용자가 이용할 수 있습니다. 이메일로 가입한 후 로그인하여 체험 기간, 라이선스 및 AI 포인트를 확인하세요.'],
 'Start a 72-hour trial after registration.':['สมัครแล้วทดลองใช้งานได้ 72 ชั่วโมง','登録後、72 時間の無料トライアル。','가입 후 72시간 무료 체험.'],
 'New users can claim a 72-hour free trial of the DTF, DTG and Sublimation production modules, with unlimited use during the valid trial period.':['ผู้ใช้ใหม่รับสิทธิ์ทดลองใช้โมดูล DTF, DTG และงานพิมพ์ซับลิเมชันฟรี 72 ชั่วโมง โดยใช้งานได้ไม่จำกัดจำนวนครั้งภายในช่วงทดลองใช้','新規ユーザーは DTF、DTG、昇華転写の基本生産機能を 72 時間無料で試用できます。有効な試用期間中は回数制限なく利用できます。','신규 사용자는 DTF, DTG 및 승화전사 기본 생산 기능을 72시간 무료로 체험할 수 있습니다. 유효한 체험 기간에는 횟수 제한 없이 이용할 수 있습니다.'],
 '(AI credits are not included in the 72-hour trial. AI has 5 separate free uses; further processing requires AI credits.)':['(เครดิต AI ไม่รวมอยู่ในสิทธิ์ทดลองใช้ 72 ชั่วโมง โดย AI มีสิทธิ์ทดลองแยกต่างหาก 5 ครั้ง หลังจากนั้นต้องใช้เครดิต AI)','（AI ポイントは 72 時間のトライアルに含まれません。AI は別途 5 回無料で試用でき、その後は AI ポイントが必要です。）','(AI 포인트는 72시간 체험에 포함되지 않습니다. AI는 별도로 5회 무료 체험할 수 있으며, 이후에는 AI 포인트가 필요합니다.)'],
 'The base-module trial cannot be claimed again with the same email or computer. Check trial dates and remaining AI uses in the app.':['อีเมลหรือคอมพิวเตอร์เครื่องเดิมไม่สามารถรับสิทธิ์ทดลองโมดูลพื้นฐานซ้ำได้ ตรวจสอบช่วงทดลองใช้และจำนวนครั้งทดลอง AI ที่เหลือได้ในโปรแกรม','同じメールアドレスまたは同じパソコンで、基本機能の無料トライアルを再度取得することはできません。試用期間と AI の残り試用回数はアプリ内でご確認ください。','동일한 이메일 또는 동일한 컴퓨터로 기본 기능 체험을 반복 신청할 수 없습니다. 체험 기간과 남은 AI 체험 횟수는 앱에서 확인하세요.'],
 'These three tools are free.':['สามเครื่องมือนี้ ใช้ฟรี','この 3 つのツールは無料です。','이 세 가지 도구는 무료입니다.'],
 'Halftone, MAIXON Image Finder and the Voice Commands interface are free to use, with no separate license purchase for these tools.':['ฮาล์ฟโทน MAIXON ค้นหารูปภาพ และช่องทางสั่งงานด้วยเสียงใช้งานได้ฟรี ไม่ต้องซื้อไลเซนส์แยกสำหรับเครื่องมือเหล่านี้','ハーフトーン、MAIXON 画像検索、音声コマンドの操作入口は無料です。これらのツール単体のライセンス購入は不要です。','하프톤, MAIXON 이미지 검색 및 음성 명령 입력 기능은 무료이며, 이 도구들을 위한 별도 라이선스 구매는 필요하지 않습니다.'],
 'Free voice control. Access follows the production module.':['สั่งงานด้วยเสียงฟรี สิทธิ์ทำงานขึ้นอยู่กับโมดูลที่เรียกใช้','音声操作は無料。実行権限は各生産機能に準じます。','음성 제어는 무료. 실행 권한은 생산 모듈에 따릅니다.'],
 'Voice Commands is an input method, and access follows the tool it calls. Halftone is free, so it can be run by voice without buying a production module. DTF, DTG and Sublimation tasks require a valid license or trial for their corresponding module.':['การสั่งงานด้วยเสียงเป็นช่องทางป้อนคำสั่ง สิทธิ์ทำงานขึ้นอยู่กับฟังก์ชันที่เรียกใช้ ฮาล์ฟโทนเป็นฟังก์ชันฟรี จึงสั่งงานด้วยเสียงได้โดยไม่ต้องซื้อโมดูลการผลิต ส่วนงาน DTF, DTG และซับลิเมชันต้องมีไลเซนส์หรือสิทธิ์ทดลองใช้ที่ยังมีผลสำหรับโมดูลนั้น','音声コマンドは操作の入口です。実行権限は呼び出す機能によって決まります。ハーフトーンは無料のため、生産モジュールを購入せずに音声で実行できます。DTF、DTG、昇華転写の作業には、それぞれの有効なライセンスまたは試用権限が必要です。','음성 명령은 작업을 입력하는 방식이며, 실행 권한은 호출하는 기능에 따라 결정됩니다. 하프톤은 무료이므로 생산 모듈을 구매하지 않아도 음성으로 실행할 수 있습니다. DTF, DTG 및 승화전사 작업은 해당 모듈의 유효한 라이선스 또는 체험 권한이 필요합니다.'],
 'For example, after the 72-hour trial ends, a DTF-only license lets you run DTF tasks by voice. It does not let you run DTG tasks by voice. DTG preparation requires the corresponding DTG license.':['ตัวอย่างเช่น หลังสิทธิ์ทดลอง 72 ชั่วโมงสิ้นสุด หากซื้อเฉพาะไลเซนส์ DTF จะสั่งงาน DTF ด้วยเสียงได้ แต่สั่งงาน DTG ไม่ได้ งาน DTG ต้องเปิดใช้งานไลเซนส์ DTG ที่ตรงกัน','例：72 時間のトライアル終了後、DTF のみを購入した場合、音声で DTF の作業を実行できますが、DTG の作業は実行できません。DTG の準備作業には対応する DTG ライセンスが必要です。','예를 들어 72시간 체험 종료 후 DTF만 구매했다면 음성으로 DTF 작업을 실행할 수 있지만 DTG 작업은 실행할 수 없습니다. DTG 작업에는 해당 DTG 라이선스가 필요합니다.'],
 'Available without a production-module purchase, because Halftone is free.':['ใช้งานได้โดยไม่ต้องซื้อโมดูลการผลิต เพราะฮาล์ฟโทนฟรี','ハーフトーンは無料のため、生産モジュールの購入なしで利用できます。','하프톤은 무료이므로 생산 모듈을 구매하지 않아도 이용할 수 있습니다.'],
 'Requires a DTF license or valid trial. It cannot run without a purchase after the trial ends.':['ต้องมีไลเซนส์ DTF หรือสิทธิ์ทดลองใช้ที่ยังมีผล หากยังไม่ได้ซื้อและหมดช่วงทดลองแล้ว จะไม่สามารถทำงานนี้ได้','DTF ライセンスまたは有効な試用権限が必要です。試用期間終了後、未購入の場合は実行できません。','DTF 라이선스 또는 유효한 체험 권한이 필요합니다. 체험 종료 후 구매하지 않은 경우에는 실행할 수 없습니다.'],
 '5 separate free uses, then AI credits. Software module licenses do not include AI credits.':['ทดลอง AI แยกต่างหากฟรี 5 ครั้ง จากนั้นใช้เครดิต AI ไลเซนส์โมดูลซอฟต์แวร์ไม่รวมเครดิต AI','AI は別途 5 回無料で試用でき、その後は AI ポイントを使用します。ソフトウェアのモジュールライセンスに AI ポイントは含まれません。','AI는 별도로 5회 무료 체험할 수 있으며 이후에는 AI 포인트를 사용합니다. 소프트웨어 모듈 라이선스에는 AI 포인트가 포함되지 않습니다.'],
 'WhatsApp':['WhatsApp','WhatsApp','WhatsApp'],
 'Vectorize · AI WORKBENCH · MAIXON':['แปลงเป็นเวกเตอร์ · เวิร์กสเปซ AI · MAIXON','ベクター化 · AI ワークスペース · MAIXON','벡터화 · AI 작업실 · MAIXON'],
 'HALFTONE · MAIXON TOOL V9.1':['ฮาล์ฟโทน · MAIXON TOOL V9.1','ハーフトーン · MAIXON TOOL V9.1','하프톤 · MAIXON TOOL V9.1'],
 'MainTop 6.1':['MainTop 6.1','MainTop 6.1','MainTop 6.1'],
 '← MainTop':['← MainTop','← MainTop','← MainTop'],
 'Connect MainTop':['เชื่อมต่อ MainTop','MainTop へ接続','MainTop 연결'],
 '08 · MAIXON × MainTop':['08 · MAIXON × MainTop','08 · MAIXON × MainTop','08 · MAIXON × MainTop'],
 'MAIXON IMAGE FINDER':['MAIXON ค้นหารูปภาพ','MAIXON 画像検索','MAIXON 이미지 검색'],
 'MAIXON IMAGE FINDER →':['MAIXON ค้นหารูปภาพ →','MAIXON 画像検索 →','MAIXON 이미지 검색 →'],
 '← MAIXON IMAGE FINDER':['← MAIXON ค้นหารูปภาพ','← MAIXON 画像検索','← MAIXON 이미지 검색'],
 'CNY / ¥':['CNY / ¥','CNY / ¥','CNY / ¥'],
 'Software licenses and MAIXON AI credits are purchased separately. All prices are in CNY.':['ไลเซนส์ซอฟต์แวร์และเครดิต MAIXON AI ซื้อแยกกัน ราคาทั้งหมดเป็นเงินหยวนจีน (CNY)','ソフトウェアライセンスと MAIXON AI ポイントは別途購入します。価格はすべて中国人民元 (CNY) です。','소프트웨어 라이선스와 MAIXON AI 포인트는 별도로 구매합니다. 모든 가격은 중국 위안 (CNY) 기준입니다.']
};
const names={th:{'Voice Commands':'สั่งงานด้วยเสียง','AI Workbench':'เวิร์กสเปซ AI','MAIXON Image Finder':'MAIXON ค้นหารูปภาพ','Sublimation':'งานพิมพ์ซับลิเมชัน','Halftone':'ฮาล์ฟโทน'},ja:{'Voice Commands':'音声コマンド','AI Workbench':'AI ワークスペース','MAIXON Image Finder':'MAIXON 画像検索','Sublimation':'昇華転写','Halftone':'ハーフトーン'},ko:{'Voice Commands':'음성 명령','AI Workbench':'AI 작업실','MAIXON Image Finder':'MAIXON 이미지 검색','Sublimation':'승화전사','Halftone':'하프톤'}};
const terminology={
 'Extract Print':['แยกลายพิมพ์','図案抽出','도안 추출'],
 'Enhance Detail':['เพิ่มความคมชัด','高画質化','선명도 향상'],
 'Enhance':['เพิ่มความคมชัด','高画質化','선명도 향상'],
 'Crop Print':['ครอบตัดลายพิมพ์','図案の切り抜き','도안 자르기'],
 'Vectorize':['แปลงเป็นเวกเตอร์','ベクター化','벡터화'],
 'Dark Fabric':['ผ้าสีเข้ม','濃色生地','어두운 원단'],
 'Light Fabric':['ผ้าสีอ่อน','淡色生地','밝은 원단'],
 'Library Management':['จัดการคลังภาพ','ライブラリ管理','라이브러리 관리'],
 'Local History':['ประวัติในเครื่อง','ローカル履歴','로컬 기록'],
 'Save and Backup':['บันทึกและสำรอง','保存とバックアップ','저장 및 백업'],
 'Quality Rebuild':['สร้างดัชนีใหม่แบบคุณภาพสูง','高品質インデックス再構築','고품질 인덱스 재구축'],
 'Image Finder':['ค้นหารูปภาพ','画像検索','이미지 검색'],
 'Single Artwork':['งานภาพเดี่ยว','単一図案','단일 도안'],
 'Multiple-image Layout':['จัดวางหลายภาพ','複数画像レイアウト','여러 이미지 배치'],
 'PSD / PSB Pieces':['ชิ้นงาน PSD / PSB','PSD / PSB パーツ','PSD / PSB 조각'],
 'White Choke':['ย่อขอบหมึกขาว','白インクの収縮','흰색 잉크 가장자리 수축']
};
Object.assign(reviewed,JSON.parse(await fs.readFile('src/data/i18n/captions-reviewed.json','utf8')));
Object.assign(reviewed,JSON.parse(await fs.readFile('src/data/i18n/marketing-reviewed.json','utf8')));
for(const [index,locale] of ['th','ja','ko'].entries()){
 const filename=`src/data/i18n/${locale}.json`,catalog=JSON.parse(await fs.readFile(filename,'utf8'));
 for(const [source,target] of Object.entries(reviewed))catalog[source]=target[index];
 for(const [source,value] of Object.entries(catalog)){
  let result=value;
  for(const [term,translation] of Object.entries(names[locale]))result=result.replaceAll(term,translation);
  for(const [term,translations] of Object.entries(terminology))result=result.replaceAll(term,translations[index]);
  if(locale==='th')result=result.replaceAll('โต๊ะทำงาน AI','เวิร์กสเปซ AI').replaceAll('ระบบระเหิด','งานพิมพ์ซับลิเมชัน').replaceAll('ธีมแสง','โหมดสว่าง').replaceAll('ธีมสีเข้ม','โหมดมืด');
  if(locale==='ja')result=result.replaceAll('AI クレジット','AI ポイント').replaceAll('AIクレジット','AI ポイント');
  if(locale==='ko')result=result.replaceAll('AI 크레딧','AI 포인트');
  if(locale==='ko')result=result.replaceAll('포인트이','포인트가').replaceAll('포인트을','포인트를').replaceAll('포인트은','포인트는').replaceAll('포인트으로','포인트로');
  if(locale==='ko')result=result.replaceAll('작업실를','작업실을');
  if(locale==='ko')result=result.replaceAll('이미지 검색는','이미지 검색은').replaceAll('이미지 검색를','이미지 검색을').replaceAll('AI 작업대','AI 작업실');
  if(source.includes('MainTop'))result=result.replace(/メイントップ|메인톱|메인탑/g,'MainTop');
  if(source.includes('MAIXON'))result=result.replace(/ไมซอน|メゾン|マクソン|マイソン|메종/g,'MAIXON');
  if(source.includes('MAIXON TOOL'))result=result.replace(/MAIXON\s*(?:ツール|툴|เครื่องมือ)/g,'MAIXON TOOL');
  if(/^Play with sound[:：]/.test(source)){
   const title=source.replace(/^Play with sound[:：]\s*/,'');
   const translatedTitle=catalog[title];
   if(translatedTitle)result=`${{th:'เล่นพร้อมเสียง: ',ja:'音声付きで再生：',ko:'소리와 함께 재생: '}[locale]}${translatedTitle.replace(/メイントップ|메인톱|메인탑/g,'MainTop')}`;
  }
  catalog[source]=result.replace(/\s+/g,' ').trim();
 }
 await fs.writeFile(filename,JSON.stringify(Object.fromEntries(Object.entries(catalog).sort((a,b)=>a[0].localeCompare(b[0]))),null,2)+'\n');
}
console.log(`Reviewed ${Object.keys(reviewed).length} essential marketing, navigation and licensing phrases in all three languages.`);
await import('./review-southeast-asian-localization.mjs');
