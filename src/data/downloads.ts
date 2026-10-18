import type { Locale } from "./media";

export type DownloadReleaseStatus = "available" | "awaiting-artifact" | "coming-soon";

export type DownloadInstaller = Readonly<{
  displayName: string;
  version: string;
  installerFilename: string;
  downloadUrl: string;
  fileSize: number;
  sha256: string;
}>;

export type DownloadPlatform = Readonly<{
  id: "windows7" | "windows10" | "windows11" | "macos";
  label: string;
  platform: "windows" | "macos";
  releaseStatus: DownloadReleaseStatus;
  enabled: boolean;
  installer: DownloadInstaller | null;
  minimumOS: string | null;
  architecture: string | null;
}>;

export const windows7Installer: DownloadInstaller = {
  displayName: "MAIXON TOOL V9.2 for Windows 7",
  version: "9.2.0.5",
  installerFilename: "MAIXON_TOOL_V9.2_Windows7_SP1_x64_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V9.2_Windows7_SP1_x64_Setup.exe?build=9.2.0.5",
  fileSize: 255_670_910,
  sha256: "ED145A9ED82DCF8C9278CEE4E9AF2095F31963796AC7C6D9AA599B31D31BE8A0"
};

export const windows1011Installer: DownloadInstaller = {
  displayName: "MAIXON TOOL V9.1 for Windows 10 / 11",
  version: "9.1.0.4",
  installerFilename: "MAIXON_TOOL_V9.1_Windows10_11_x64_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V9.1_Windows10_11_x64_Setup.exe?build=9.1.0.4",
  fileSize: 216_639_696,
  sha256: "D3702697CBB12FE37CBD25F38AA40AB936F753EFA9C0F637DD84E9A405E900E0"
};

export const downloadPlatforms: readonly DownloadPlatform[] = [
  {
    id: "windows7",
    label: "Windows 7",
    platform: "windows",
    releaseStatus: "available",
    enabled: true,
    installer: windows7Installer,
    minimumOS: "Windows 7 SP1",
    architecture: "x64 / 64-bit"
  },
  {
    id: "windows10",
    label: "Windows 10",
    platform: "windows",
    releaseStatus: "available",
    enabled: true,
    installer: windows1011Installer,
    minimumOS: "Windows 10",
    architecture: null
  },
  {
    id: "windows11",
    label: "Windows 11",
    platform: "windows",
    releaseStatus: "available",
    enabled: true,
    installer: windows1011Installer,
    minimumOS: "Windows 11",
    architecture: null
  },
  {
    id: "macos",
    label: "macOS",
    platform: "macos",
    releaseStatus: "coming-soon",
    enabled: false,
    installer: null,
    minimumOS: null,
    architecture: null
  }
] as const;

export const downloadAssistanceResources = [
  {
    id: "installation-assistant",
    downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_Installation_Assistant_20260912.zip",
    filename: "MAIXON_Installation_Assistant_20260912.zip",
    label: { "zh-CN": "PS 安装包", en: "Photoshop installation package" }
  },
  {
    id: "maintop-6.1",
    downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_MAINTOP_6.1_20250911.zip",
    filename: "MAIXON_MAINTOP_6.1_20250911.zip",
    label: { "zh-CN": "蒙泰 6.1 版本", en: "MainTop 6.1" }
  }
] as const;

export const downloadResources = [
  {
    id: "test-images",
    downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_Test_Images_20260912.zip",
    filename: "MAIXON_Test_Images_20260912.zip",
    label: { "zh-CN": "测试图文件", en: "Test image files" }
  }
] as const;

type PlatformCopy = Record<DownloadPlatform["id"], { status: string; action: string }>;

export const downloadSelectorCopy: Record<Locale, {
  title: string;
  description: string;
  close: string;
  download: string;
  assistance: string;
  platforms: PlatformCopy;
}> = {
  "zh-CN": {
    title: "选择操作系统",
    description: "选择与你的电脑对应的版本。",
    close: "关闭操作系统选择器",
    download: "下载",
    assistance: "下载辅助软件",
    platforms: {
      windows7: { status: "V9.2", action: "下载" },
      windows10: { status: "V9.1", action: "下载" },
      windows11: { status: "V9.1", action: "下载" },
      macos: { status: "开发中", action: "开发中" }
    }
  },
  en: {
    title: "Choose your operating system",
    description: "Select the version that matches your computer.",
    close: "Close operating system selector",
    download: "Download",
    assistance: "Download auxiliary software",
    platforms: {
      windows7: { status: "V9.2", action: "Download" },
      windows10: { status: "V9.1", action: "Download" },
      windows11: { status: "V9.1", action: "Download" },
      macos: { status: "Coming Soon", action: "Coming Soon" }
    }
  }
};
