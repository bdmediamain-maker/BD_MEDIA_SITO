/**
 * SplashScreen — full-viewport overlay shown on page load.
 * Displays the BD Media logo icon (same image used in the Navbar) centered.
 * No animations yet.
 */
const SplashScreen = () => {
  return (
    <div
      className="fixed inset-0 flex items-center justify-center bg-background"
      style={{
        width: "100vw",
        height: "100vh",
        zIndex: 9999,
      }}
      aria-hidden="true"
    >
      <img
        src="/logo-full.png"
        alt=""
        style={{ width: 80, height: 80, objectFit: "contain" }}
      />
    </div>
  );
};

export default SplashScreen;
