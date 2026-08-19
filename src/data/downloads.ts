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
  displayName: "MAIXON TOOL V5.9 for Windows 7",
  version: "5.9.0",
  installerFilename: "MAIXON_TOOL_V5.9_Windows7_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V5.9_Windows7_Setup.exe",
  fileSize: 67_516_832,
  sha256: "EC6F3C6098D4B26DF98FCB1567F1718A1AC0A8246ADFD2E792CC0C69B5FB79C5"
};

export const windows1011Installer: DownloadInstaller = {
  displayName: "MAIXON TOOL V5.9 for Windows 10 / 11",
  version: "5.9.0",
  installerFilename: "MAIXON_TOOL_V5.9_Windows10_11_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V5.9_Windows10_11_Setup.exe",
  fileSize: 71_576_430,
  sha256: "2528235A8E95CAAB8FAD0BCABFD4D1523B189EEEB61759464B53E6427E7550D7"
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

type PlatformCopy = Record<DownloadPlatform["id"], { status: string; action: string }>;

export const downloadSelectorCopy: Record<Locale, {
  title: string;
  description: string;
  close: string;
  download: string;
  platforms: PlatformCopy;
}> = {
  "zh-CN": {
    title: "选择操作系统",
    description: "选择与你的电脑对应的版本。",
    close: "关闭操作系统选择器",
    download: "下载",
    platforms: {
      windows7: { status: "V5.9", action: "下载" },
      windows10: { status: "V5.9", action: "下载" },
      windows11: { status: "V5.9", action: "下载" },
      macos: { status: "V5.9", action: "下载" }
    }
  },
  en: {
    title: "Choose your operating system",
    description: "Select the version that matches your computer.",
    close: "Close operating system selector",
    download: "Download",
    platforms: {
      windows7: { status: "V5.9", action: "Download" },
      windows10: { status: "V5.9", action: "Download" },
      windows11: { status: "V5.9", action: "Download" },
      macos: { status: "V5.9", action: "Download" }
    }
  }
};
