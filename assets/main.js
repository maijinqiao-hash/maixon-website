(function () {
  "use strict";

  const data = window.MAIXON_SITE_DATA || {};
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  function configureSiteData() {
    if (data.downloadUrl) {
      $$(".download-link").forEach((link) => {
        link.href = data.downloadUrl;
        link.rel = "noopener";
      });
    }

    if (data.phone) {
      $$(".contact-phone").forEach((link) => {
        link.href = `tel:${data.phone}`;
        link.textContent = `咨询${data.seller || "销售"} · ${data.phone}`;
      });
    }
  }

  function configureNavigation() {
    const toggle = $(".nav-toggle");
    const nav = $(".main-nav");
    if (!toggle || !nav) return;

    const close = () => {
      nav.classList.remove("open");
      toggle.classList.remove("open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.setAttribute("aria-label", "打开导航");
    };

    toggle.addEventListener("click", () => {
      const isOpen = !nav.classList.contains("open");
      nav.classList.toggle("open", isOpen);
      toggle.classList.toggle("open", isOpen);
      toggle.setAttribute("aria-expanded", String(isOpen));
      toggle.setAttribute("aria-label", isOpen ? "关闭导航" : "打开导航");
    });

    $$("a", nav).forEach((link) => link.addEventListener("click", close));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") close();
    });
    document.addEventListener("click", (event) => {
      if (!nav.contains(event.target) && !toggle.contains(event.target)) close();
    });
  }

  function configureReveal() {
    const items = $$(".reveal, .reveal-delay, .reveal-delay-2");
    if (reducedMotion || !("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("visible"));
      return;
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px" });

    items.forEach((item) => observer.observe(item));
  }

  function configureWorkflow() {
    const pipeline = $("[data-pipeline]");
    const runButton = $(".run-workflow");
    if (!pipeline || !runButton) return;

    const steps = $$(".pipeline-step", pipeline);
    const track = $(".pipeline-track span", pipeline);
    const status = $(".app-action-row > span");
    let timers = [];

    const reset = () => {
      timers.forEach(window.clearTimeout);
      timers = [];
      steps.forEach((step, index) => {
        step.classList.toggle("active", index === 0);
        step.classList.remove("done");
      });
      if (track) track.style.width = "0%";
      if (status) status.lastChild.textContent = " 自动化流程待命";
      runButton.disabled = false;
      runButton.textContent = "运行完整流程";
    };

    const run = () => {
      reset();
      runButton.disabled = true;
      runButton.textContent = "正在自动处理…";
      const labels = ["正在读取画布", "正在处理尺寸与扩边", "正在生成 W1 通道", "正在导出 _W1.tif"];
      const duration = reducedMotion ? 80 : 780;

      steps.forEach((step, index) => {
        const timer = window.setTimeout(() => {
          steps.forEach((current, currentIndex) => {
            current.classList.toggle("active", currentIndex === index);
            current.classList.toggle("done", currentIndex < index);
          });
          if (track) track.style.width = `${index * 33.333}%`;
          if (status) status.lastChild.textContent = ` ${labels[index]}`;
        }, duration * index);
        timers.push(timer);
      });

      timers.push(window.setTimeout(() => {
        steps.forEach((step) => {
          step.classList.remove("active");
          step.classList.add("done");
        });
        if (track) track.style.width = "100%";
        if (status) status.lastChild.textContent = " 已完成：图片_W1.tif";
        runButton.disabled = false;
        runButton.textContent = "再次运行";
      }, duration * steps.length));
    };

    runButton.addEventListener("click", run);
  }

  function configureHeroModes() {
    const buttons = $$(".app-sidebar button");
    const title = $(".panel-heading h2");
    if (!buttons.length || !title) return;

    const titles = ["标准烫画", "标准印花图", "单图自动排版", "多图智能排版"];
    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        title.textContent = titles[index];
      });
    });
  }

  function configureProcessDemo() {
    const buttons = $$("[data-process]");
    const stage = $("[data-process-demo]");
    if (!buttons.length || !stage) return;
    let current = 0;
    let timer;

    const activate = (index) => {
      current = index;
      buttons.forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === index));
      stage.dataset.processStep = String(index);
    };

    const restart = () => {
      window.clearInterval(timer);
      if (!reducedMotion) {
        timer = window.setInterval(() => activate((current + 1) % buttons.length), 2400);
      }
    };

    buttons.forEach((button, index) => {
      button.addEventListener("click", () => {
        activate(index);
        restart();
      });
    });
    activate(0);
    restart();
  }

  function configureSingleLayout() {
    const widthControl = $("#maxWidth");
    const film = $("#singleFilm");
    if (!widthControl || !film) return;

    const sourceCanvasWidth = 12.5;
    const render = () => {
      const maximumWidth = Number(widthControl.value);
      const copies = Math.max(1, Math.floor(maximumWidth / sourceCanvasWidth));
      const cellWidth = Math.max(1, Math.floor(maximumWidth / copies));
      const finalWidth = cellWidth * copies;

      $("#maxWidthValue").textContent = `${maximumWidth} cm`;
      $("#copyCount").textContent = `${copies} 张`;
      $("#cellWidth").textContent = `${cellWidth} cm`;
      $("#layoutWidth").textContent = `${finalWidth} cm`;
      $("#filmWidthLabel").textContent = `${maximumWidth} cm`;
      $("#filmWidthEnd").textContent = String(maximumWidth);
      film.style.setProperty("--copies", String(copies));
      film.replaceChildren();

      for (let index = 0; index < copies; index += 1) {
        const item = document.createElement("div");
        item.className = "film-item";
        item.style.animationDelay = `${index * 0.13}s`;
        item.setAttribute("aria-label", `第 ${index + 1} 张图`);
        const artwork = document.createElement("span");
        artwork.className = "film-art";
        artwork.textContent = "MX";
        item.appendChild(artwork);
        film.appendChild(item);
      }
    };

    widthControl.addEventListener("input", render);
    render();
  }

  function configureMultiLayout() {
    const replay = $(".replay-layout");
    const visual = $(".multi-layout-visual");
    if (!replay || !visual) return;

    replay.addEventListener("click", () => {
      visual.classList.remove("is-running");
      void visual.offsetWidth;
      visual.classList.add("is-running");
    });
  }

  function configureChannelPreview() {
    const buttons = $$("[data-channel-view]");
    const monitor = $(".channel-monitor");
    if (!buttons.length || !monitor) return;

    buttons.forEach((button) => {
      button.addEventListener("click", () => {
        buttons.forEach((item) => item.classList.remove("active"));
        button.classList.add("active");
        monitor.dataset.channelMonitor = button.dataset.channelView;
      });
    });
  }

  configureSiteData();
  configureNavigation();
  configureReveal();
  configureWorkflow();
  configureHeroModes();
  configureProcessDemo();
  configureSingleLayout();
  configureMultiLayout();
  configureChannelPreview();
})();
