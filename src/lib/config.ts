// Centralized dynamic configuration variables for northHeat Plumbing & Heating
// Facilitates instantaneous updates via the Admin Portal

import { useState, useEffect } from 'react';

export interface WebsiteConfig {
  phone: string;
  phoneRaw: string;
  email: string;
  heroTitle: string;
  heroSubtitle: string;
  boilerPrice: string;
  emergencyFee: string;
  allowEmergencyDispatch: boolean;
  promoBannerText: string;
  showPromoBanner: boolean;
}

const DEFAULT_CONFIG: WebsiteConfig = {
  phone: "0113 467 8910",
  phoneRaw: "01134678910",
  email: "info@northheat.co.uk",
  heroTitle: "West Yorkshire's Certified Heating Masters",
  heroSubtitle: "Premium Gas Safe certified boiler installations, rapid 1-hour local emergency plumbing, and luxury turnkey bathroom fitting with up to 12 years of warranty.",
  boilerPrice: "£1,650",
  emergencyFee: "£79",
  allowEmergencyDispatch: true,
  promoBannerText: "🎉 SUMMER BONUS: Save up to £300 on any A-rated Ideal or Worcester Bosch boiler upgrade this month!",
  showPromoBanner: true
};

export function getWebsiteConfig(): WebsiteConfig {
  try {
    const saved = localStorage.getItem('northheat_website_config');
    if (saved) {
      return { ...DEFAULT_CONFIG, ...JSON.parse(saved) };
    }
  } catch (e) {
    console.warn("Failed to load website configuration", e);
  }
  return DEFAULT_CONFIG;
}

export function saveWebsiteConfig(config: Partial<WebsiteConfig>): WebsiteConfig {
  const current = getWebsiteConfig();
  const updated = { ...current, ...config };
  try {
    localStorage.setItem('northheat_website_config', JSON.stringify(updated));
    // Dispatch a custom event to instantly reload config values across the client
    window.dispatchEvent(new Event('northheat_config_updated'));
  } catch (e) {
    console.error("Failed to persist website configuration", e);
  }
  return updated;
}

export function useWebsiteConfig() {
  const [config, setConfig] = useState<WebsiteConfig>(getWebsiteConfig());

  useEffect(() => {
    const handleUpdate = () => {
      setConfig(getWebsiteConfig());
    };
    window.addEventListener('northheat_config_updated', handleUpdate);
    return () => {
      window.removeEventListener('northheat_config_updated', handleUpdate);
    };
  }, []);

  return config;
}

