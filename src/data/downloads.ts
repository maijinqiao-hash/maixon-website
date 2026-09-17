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
  displayName: "MAIXON TOOL V7.9.0.4 for Windows 7",
  version: "7.9.0.4",
  installerFilename: "MAIXON_TOOL_V7.9.0.4_Windows7_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V7.9.0.4_Windows7_Setup.exe",
  fileSize: 89_330_796,
  sha256: "73EA7DFC824CAE9D115A10919AF8770C3CB64C0099E465BDB589C0E47D9654B0"
};

export const windows1011Installer: DownloadInstaller = {
  displayName: "MAIXON TOOL V7.9.0.4 for Windows 10 / 11",
  version: "7.9.0.4",
  installerFilename: "MAIXON_TOOL_V7.9.0.4_Windows10_11_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V7.9.0.4_Windows10_11_Setup.exe",
  fileSize: 120_973_618,
  sha256: "FC568808FC96A96B1B622465D52D240F655C4F59CCD3754103B3E56AABFDA8E2"
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
    label: { "zh-CN": "蒙泰 6.1 版本", en: "MAINTOP 6.1" }
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
      windows7: { status: "V7.9.0.2", action: "下载" },
      windows10: { status: "V7.9.0.2", action: "下载" },
      windows11: { status: "V7.9.0.2", action: "下载" },
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
      windows7: { status: "V7.9.0.2", action: "Download" },
      windows10: { status: "V7.9.0.2", action: "Download" },
      windows11: { status: "V7.9.0.2", action: "Download" },
      macos: { status: "Coming Soon", action: "Coming Soon" }
    }
  }
};
