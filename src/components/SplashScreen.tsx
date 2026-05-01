import { useEffect, useState } from "react";

const SplashScreen = () => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2500);
    return () => clearTimeout(t);
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background animate-fade-in"
      style={{ width: "100vw", height: "100vh", zIndex: 9999 }}
      aria-hidden="true"
    >
      <img
        src="/logo_3_frecce_bdmedia.png"
        alt=""
        className="h-24 w-auto md:h-32 animate-scale-in"
      />
    </div>
  );
};

export default SplashScreen;
