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
  displayName: "MAIXON TOOL V6.3.2 for Windows 7",
  version: "6.3.2.0",
  installerFilename: "MAIXON_TOOL_V6.3.2_Windows7_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V6.3.2_Windows7_Setup.exe",
  fileSize: 70_188_753,
  sha256: "43DE0AFD01E8DEBC5624046DDC687FA3D07EF288F8865B29655CA0EE005D650E"
};

export const windows1011Installer: DownloadInstaller = {
  displayName: "MAIXON TOOL V6.3.2 for Windows 10 / 11",
  version: "6.3.2.0",
  installerFilename: "MAIXON_TOOL_V6.3.2_Windows10_11_Setup.exe",
  downloadUrl: "https://maixon-download.oss-cn-hongkong.aliyuncs.com/downloads/MAIXON_TOOL_V6.3.2_Windows10_11_Setup.exe",
  fileSize: 75_574_258,
  sha256: "A897D474D5D7AF939DEBF6D37A4F33652156964DB51F1A7618F3D26FA01F16E8"
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
      windows7: { status: "V6.3.2", action: "下载" },
      windows10: { status: "V6.3.2", action: "下载" },
      windows11: { status: "V6.3.2", action: "下载" },
      macos: { status: "开发中", action: "开发中" }
    }
  },
  en: {
    title: "Choose your operating system",
    description: "Select the version that matches your computer.",
    close: "Close operating system selector",
    download: "Download",
    platforms: {
      windows7: { status: "V6.3.2", action: "Download" },
      windows10: { status: "V6.3.2", action: "Download" },
      windows11: { status: "V6.3.2", action: "Download" },
      macos: { status: "Coming Soon", action: "Coming Soon" }
    }
  }
};
