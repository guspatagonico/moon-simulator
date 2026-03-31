import { getPhaseInfo, type PhaseInfo } from '../simulation/MoonPhase';
import { simulationStore } from '../main';
import { i18n, t } from '../i18n/i18n';

const PHASE_EMOJIS: Record<string, string> = {
  newMoon: '🌑',
  waxingCrescent: '🌒',
  firstQuarter: '🌓',
  waxingGibbous: '🌔',
  fullMoon: '🌕',
  waningGibbous: '🌖',
  lastQuarter: '🌗',
  waningCrescent: '🌘',
};

const MOBILE_MEDIA_QUERY = '(max-width: 768px)';

export class InfoPanel {
  private element: HTMLElement;
  private currentPhaseIndex = -1;
  private isExpanded = !window.matchMedia(MOBILE_MEDIA_QUERY).matches;
  private illuminationValue: HTMLElement | null = null;
  private dayValue: HTMLElement | null = null;
  private angleValue: HTMLElement | null = null;
  private summaryValue: HTMLElement | null = null;
  private toggleButton: HTMLButtonElement | null = null;

  constructor() {
    const element = document.getElementById('info-panel');
    if (!(element instanceof HTMLElement)) {
      throw new Error('Element with id "info-panel" was not found');
    }
    this.element = element;

    simulationStore.subscribe((state) => {
      this.render(getPhaseInfo(state.currentDay));
    });

    i18n.onLanguageChange(() => {
      this.currentPhaseIndex = -1;
      this.render(getPhaseInfo(simulationStore.get().currentDay));
    });
  }

  private updateDrawerState(): void {
    this.element.classList.toggle('collapsed', !this.isExpanded);
    if (this.toggleButton) {
      this.toggleButton.textContent = this.isExpanded ? '−' : '+';
      this.toggleButton.setAttribute('aria-expanded', String(this.isExpanded));
      this.toggleButton.setAttribute('aria-label', t(this.isExpanded ? 'ui.collapseDetails' : 'ui.expandDetails'));
      this.toggleButton.title = t(this.isExpanded ? 'ui.collapseDetails' : 'ui.expandDetails');
    }
  }

  private bindToggleButton(): void {
    const toggleButton = this.element.querySelector('.info-panel-toggle');
    this.toggleButton = toggleButton instanceof HTMLButtonElement ? toggleButton : null;
    this.toggleButton?.addEventListener('click', () => {
      this.isExpanded = !this.isExpanded;
      this.updateDrawerState();
    });
    this.updateDrawerState();
  }

  render(info: PhaseInfo): void {
    if (this.currentPhaseIndex !== info.phaseIndex) {
      const phaseName = t(`phase.${info.phaseKey}.name`);
      const description = t(`phase.${info.phaseKey}.description`);
      const misconceptionKey = `phase.${info.phaseKey}.misconception`;
      const misconception = t(misconceptionKey);
      const hasMisconception = misconception !== misconceptionKey;
      const emoji = PHASE_EMOJIS[info.phaseKey] ?? '🌙';
      const misconceptionMarkup = hasMisconception
        ? `<div class="misconception-box"><div class="misconception-label">${t('ui.commonMisconception')}</div><p class="misconception-text">${misconception}</p></div>`
        : '';

      this.element.innerHTML = `<div class="info-panel-header">
        <div class="info-panel-header-copy">
          <h2 class="phase-name">${emoji} ${phaseName}</h2>
          <div class="info-panel-summary">${t('ui.illumination')} <span class="info-panel-summary-value">${info.illumination.toFixed(1)}%</span> · ${t('ui.day')} ${info.day.toFixed(1)}</div>
        </div>
        <button class="info-panel-toggle" type="button"></button>
      </div>
      <div class="info-panel-details">
        <div class="stat-row">
          <span class="stat-label">${t('ui.illumination')}</span>
          <span class="illumination-value">${info.illumination.toFixed(1)}%</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">${t('ui.day')}</span>
          <span class="stat-value">${info.day.toFixed(1)} / 29.5</span>
        </div>
        <div class="stat-row">
          <span class="stat-label">${t('ui.phaseAngle')}</span>
          <span class="stat-value">${info.phaseAngle.toFixed(1)}${t('ui.deg')}</span>
        </div>
        <p class="phase-description">${description}</p>
        ${misconceptionMarkup}
      </div>`;

      this.currentPhaseIndex = info.phaseIndex;
      this.summaryValue = this.element.querySelector('.info-panel-summary-value');
      this.illuminationValue = this.element.querySelector('.illumination-value');
      this.dayValue = this.element.querySelectorAll('.stat-value')[0] as HTMLElement | undefined ?? null;
      this.angleValue = this.element.querySelectorAll('.stat-value')[1] as HTMLElement | undefined ?? null;
      this.bindToggleButton();
    }

    if (this.summaryValue) {
      this.summaryValue.textContent = `${info.illumination.toFixed(1)}%`;
    }
    if (this.illuminationValue) {
      this.illuminationValue.textContent = `${info.illumination.toFixed(1)}%`;
    }
    if (this.dayValue) {
      this.dayValue.textContent = `${info.day.toFixed(1)} / 29.5`;
    }
    if (this.angleValue) {
      this.angleValue.textContent = `${info.phaseAngle.toFixed(1)}${t('ui.deg')}`;
    }
    this.updateDrawerState();
  }
}

export function createInfoPanel(): InfoPanel {
  return new InfoPanel();
}
