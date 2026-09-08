# MAIXON TOOL V6.3 Website Release Record

## Release status

- Date: 2026-09-08 (Asia/Shanghai)
- Status: V6.3 WEBSITE READY — WAITING FOR WINDOWS FREEZE HASH
- Production changed: NO

## Source

- Repository: `maijinqiao-hash/maixon-website`
- Release branch: `release/website-v6.3-downloads`
- Base commit: `9b45905cf7b7c3f73acdc0ba4bf8930da287424f`
- Website release commit: `c8a513aadbc873179d7da7179522b28e2c26e884`

## Windows Freeze gate

- Freeze HEAD: PENDING
- Freeze tag: PENDING
- Windows 10/11 Freeze size and SHA256: PENDING
- Windows 7 Freeze size and SHA256: PENDING
- Triple-hash gate: PENDING

Production must not be switched until the Windows Freeze values match both the local source files and the full files downloaded from OSS.

## Windows 10/11 installer

- Local source filename: `MAIXON_TOOL_V6.3_Windows10_11_Setup(1).exe`
- Public filename: `MAIXON_TOOL_V6.3_Windows10_11_Setup.exe`
- Product version: `6.3.0.5`
- Size: `75,483,994 bytes`
- SHA256: `8051D82324047657BB5481E07D1AE65CD407021699C9D43D6C55DCD6C5CBC1F2`
- Authenticode signed: NO
- Public URL: `https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V6.3_Windows10_11_Setup.exe`
- OSS object key: `downloads/MAIXON_TOOL_V6.3_Windows10_11_Setup.exe`
- OSS ETag: `8CAF50099EB02AA7EF69CF290C40BF29`
- Public full-download verification: PASS
- Range request verification: PASS

## Windows 7 installer

- Local source filename: `MAIXON_TOOL_V6.3_Windows7_Setup.exe`
- Public filename: `MAIXON_TOOL_V6.3_Windows7_Setup.exe`
- Product version: `6.3.0.5`
- Size: `70,166,579 bytes`
- SHA256: `4906CE0DE9270FF5E032E9F0B7FA725F01756CC5C29CF87A17B039EEFA314308`
- Authenticode signed: NO
- Public URL: `https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V6.3_Windows7_Setup.exe`
- OSS object key: `downloads/MAIXON_TOOL_V6.3_Windows7_Setup.exe`
- OSS ETag: `37DEB132B6F0BA99F06C2291A66D3F36`
- Public full-download verification: PASS
- Range request verification: PASS

## OSS

- Bucket: `maixon-download`
- Region: `oss-cn-hongkong`
- Endpoint: `maixon-download.oss-cn-hongkong.aliyuncs.com`
- Object ACL: public-read for the two V6.3 objects only
- Content-Type: `application/octet-stream`
- Content-Disposition: attachment with the public filename
- Cache-Control: `public, max-age=31536000, immutable`
- V5.9 objects unchanged: YES
- V6.2 objects unchanged: YES

## Website verification

- Production build: PASS
- Generated pages: 47
- Astro errors: 0
- Bilingual validation: PASS
- Internal links: PASS
- Canonical / hreflang / x-default / Open Graph: PASS
- Local browser QA at 1440, 1280, 768 and 390 px: PASS
- Download selector mapping: PASS
- macOS remains disabled / Coming Soon: PASS
- Layout, CSS, media and product data changed: NO

## Cloudflare Preview

- Worker project: `tight-snow-d985`
- Preview version ID: `8edd0078-c6d2-46ec-b8a8-0d4c7375eaac`
- Preview URL: `https://8edd0078-tight-snow-d985.maijinqiao.workers.dev`
- Preview alias: `https://maixon-v63-release-tight-snow-d985.maijinqiao.workers.dev`
- Preview source commit: `c8a513aadbc873179d7da7179522b28e2c26e884`
- Preview QA: PASS

## Current production and rollback

- Production URL: `https://maixon.vip`
- Current production website version: `V6.2`
- Current production deployment ID: `8e1c5fae-581a-4363-afde-a8e48d7ec883`
- Current production Worker version ID: `6bdfd4fc-fa3d-4062-ac3c-2fbb5e02510c`
- Current production source commit: `9b45905cf7b7c3f73acdc0ba4bf8930da287424f`
- Rollback ready: YES
- V6.3 production deployment ID: NOT DEPLOYED

