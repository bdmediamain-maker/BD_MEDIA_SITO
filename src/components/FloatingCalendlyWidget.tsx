import { CalendlyButton } from "@/components/CalendlyModal";

const FloatingCalendlyWidget = () => {
  return (
    <div className="fixed bottom-6 right-6 z-[100]">
      <CalendlyButton />
    </div>
  );
};

export default FloatingCalendlyWidget;
