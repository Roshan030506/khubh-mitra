import React, { useEffect, useState } from 'react';
import { useApp } from '../../context/AppContext';
import { AlertOctagon, CheckCircle2, MapPin, PhoneCall, Radio, RotateCcw } from 'lucide-react';

const fallbackGps = {
  lat: 19.9975,
  lng: 73.7898,
  label: 'Ramkund Sacred Promenade, Panchavati Sector 1'
};

export const SosScreen: React.FC = () => {
  const { t, triggerSos, playClick, showToast } = useApp();
  const [isArmed, setIsArmed] = useState(false);
  const [isTriggered, setIsTriggered] = useState(false);
  const [countdown, setCountdown] = useState(3);
  const [currentGps, setCurrentGps] = useState(fallbackGps);

  const handlePressSos = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => setCurrentGps({ lat: coords.latitude, lng: coords.longitude, label: 'Your current GPS location' }),
        () => showToast('Location Unavailable', 'Using the last known mela location for SOS dispatch', 'alert'),
        { enableHighAccuracy: true, maximumAge: 30000, timeout: 8000 }
      );
    }
    setIsArmed(true);
    setCountdown(3);
  };

  const handleReleaseSos = () => {
    if (isArmed && !isTriggered) {
      setIsArmed(false);
      setCountdown(3);
      showToast('Hold Released', 'SOS was not dispatched', 'info');
    }
  };

  useEffect(() => {
    if (!isArmed || isTriggered) return;
    window.addEventListener('pointerup', handleReleaseSos);
    window.addEventListener('pointercancel', handleReleaseSos);
    return () => {
      window.removeEventListener('pointerup', handleReleaseSos);
      window.removeEventListener('pointercancel', handleReleaseSos);
    };
  }, [isArmed, isTriggered]);

  useEffect(() => {
    if (!isArmed || isTriggered) return;
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(value => value - 1), 800);
      return () => clearTimeout(timer);
    }
    setIsTriggered(true);
    triggerSos(currentGps.lat, currentGps.lng, 'Immediate emergency response requested via held SOS beacon');
  }, [countdown, currentGps.lat, currentGps.lng, isArmed, isTriggered, triggerSos]);

  const reset = () => {
    playClick();
    setIsArmed(false);
    setIsTriggered(false);
    setCountdown(3);
    showToast('SOS Standby', 'Distress alarm cancelled', 'info');
  };

  return (
    <div className="min-h-[calc(100vh-112px)] md:min-h-[calc(100vh-100px)] max-w-2xl mx-auto w-full p-4 sm:p-6 flex flex-col justify-center text-stone-100">
      {!isArmed && !isTriggered && (
        <div className="text-center space-y-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-300 text-xs font-bold uppercase tracking-wider mb-3">
              <Radio className="w-3.5 h-3.5 animate-pulse text-red-400" />
              <span>24/7 Rapid Emergency Response Active</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-red-100 font-cinzel">{t.emergencySosTitle}</h1>
            <p className="text-xs sm:text-sm text-stone-300 max-w-md mx-auto mt-2 leading-relaxed">{t.emergencySosSubtitle}</p>
          </div>
          <div className="py-6 flex justify-center">
            <button
              id="btn-trigger-sos-main"
              onPointerDown={handlePressSos}
              onPointerUp={handleReleaseSos}
              onPointerCancel={handleReleaseSos}
              onPointerLeave={handleReleaseSos}
              onKeyDown={event => {
                if (event.key === 'Enter' || event.key === ' ') handlePressSos();
              }}
              className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full bg-gradient-to-tr from-red-700 via-red-600 to-rose-500 text-white font-black text-xl sm:text-2xl tracking-widest uppercase shadow-2xl flex flex-col items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer border-4 border-red-300/40 sos-pulse"
            >
              <AlertOctagon className="w-14 h-14" />
              <span>SOS</span>
              <span className="text-[11px] font-bold tracking-wider text-red-100/90 max-w-[150px] text-center leading-tight">Hold for 3 seconds to dispatch help</span>
            </button>
          </div>
          <div className="p-3.5 rounded-2xl bg-stone-900 border border-stone-800 text-xs text-stone-300 max-w-md mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2 text-left">
              <MapPin className="w-4 h-4 text-red-400" />
              <div><span className="text-[10px] text-stone-400 block font-bold uppercase">{t.gpsCoordinates}</span><span className="font-mono text-stone-200">{currentGps.lat} N, {currentGps.lng} E</span></div>
            </div>
            <span className="text-[11px] font-bold text-emerald-400 bg-emerald-950/80 px-2.5 py-1 rounded-lg border border-emerald-500/30">GPS Ready</span>
          </div>
          <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
            <a href="tel:112" id="btn-call-police" onClick={playClick} className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold flex items-center justify-center gap-2"><PhoneCall className="w-4 h-4 text-sky-400" />{t.callPolice}</a>
            <a href="tel:108" id="btn-call-ambulance" onClick={playClick} className="p-3 rounded-xl bg-stone-900 border border-stone-800 text-xs font-bold flex items-center justify-center gap-2"><PhoneCall className="w-4 h-4 text-emerald-400" />{t.callAmbulance}</a>
          </div>
        </div>
      )}

      {isArmed && !isTriggered && (
        <div className="text-center space-y-6 p-8 rounded-3xl bg-red-950/80 border border-red-500/50 shadow-2xl">
          <div className="w-24 h-24 rounded-full bg-red-600/30 border-4 border-red-500 text-red-100 font-mono text-4xl font-black mx-auto flex items-center justify-center animate-pulse">{countdown}</div>
          <h2 className="text-2xl font-bold text-white">Keep holding to dispatch</h2>
          <p className="text-xs text-red-200/90">Release now to cancel the emergency signal.</p>
          <button id="btn-cancel-sos-countdown" onClick={reset} className="px-6 py-2.5 rounded-xl bg-stone-900 text-stone-200 border border-stone-700 text-xs font-bold uppercase cursor-pointer">Cancel False Alarm</button>
        </div>
      )}

      {isTriggered && (
        <div className="p-6 sm:p-8 rounded-3xl bg-stone-900 border border-emerald-500/50 shadow-2xl space-y-6 text-center">
          <CheckCircle2 className="w-16 h-16 text-emerald-400 mx-auto" />
          <div><span className="text-[11px] font-extrabold uppercase tracking-widest text-emerald-400 block">STATUS: CONFIRMED DISPATCH</span><h2 className="text-2xl font-black font-cinzel">{t.alertSentSuccess}</h2><p className="text-sm text-stone-300 mt-2">{t.helpIsOnTheWay}</p></div>
          <div className="p-4 rounded-2xl bg-stone-950 border border-stone-800 text-left text-xs space-y-2"><div className="flex justify-between"><span className="text-stone-400">Location Transmitted</span><span className="font-mono">{currentGps.label}</span></div><div className="flex justify-between"><span className="text-stone-400">Estimated Arrival</span><span className="text-emerald-400 font-bold">~3 Minutes</span></div></div>
          <button id="btn-reset-sos" onClick={reset} className="py-2.5 px-6 rounded-xl bg-stone-800 text-stone-300 text-xs font-bold uppercase flex items-center gap-1.5 mx-auto"><RotateCcw className="w-3.5 h-3.5" />Mark Standby / Reset</button>
        </div>
      )}
    </div>
  );
};
