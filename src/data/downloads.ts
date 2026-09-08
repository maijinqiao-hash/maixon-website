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
  displayName: "MAIXON TOOL V6.3 for Windows 7",
  version: "6.3.0.5",
  installerFilename: "MAIXON_TOOL_V6.3_Windows7_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V6.3_Windows7_Setup.exe",
  fileSize: 70_166_579,
  sha256: "4906CE0DE9270FF5E032E9F0B7FA725F01756CC5C29CF87A17B039EEFA314308"
};

export const windows1011Installer: DownloadInstaller = {
  displayName: "MAIXON TOOL V6.3 for Windows 10 / 11",
  version: "6.3.0.5",
  installerFilename: "MAIXON_TOOL_V6.3_Windows10_11_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V6.3_Windows10_11_Setup.exe",
  fileSize: 75_483_994,
  sha256: "8051D82324047657BB5481E07D1AE65CD407021699C9D43D6C55DCD6C5CBC1F2"
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
      windows7: { status: "V6.3", action: "下载" },
      windows10: { status: "V6.3", action: "下载" },
      windows11: { status: "V6.3", action: "下载" },
      macos: { status: "开发中", action: "开发中" }
    }
  },
  en: {
    title: "Choose your operating system",
    description: "Select the version that matches your computer.",
    close: "Close operating system selector",
    download: "Download",
    platforms: {
      windows7: { status: "V6.3", action: "Download" },
      windows10: { status: "V6.3", action: "Download" },
      windows11: { status: "V6.3", action: "Download" },
      macos: { status: "Coming Soon", action: "Coming Soon" }
    }
  }
};
