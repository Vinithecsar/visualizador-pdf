import { Dialog } from "@headlessui/react";
import { useState } from "react";

export default function ErrorComponent(props: { error: string }) {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  return (
    <Dialog
      as="div"
      className="relative z-10"
      open={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <div className="fixed inset-0 overflow-y-auto">
        <div className="flex min-h-full items-center justify-center p-4 text-center">
          <Dialog.Panel className="mt-[-20%] w-full max-w-md rounded-2xl bg-red-500 p-6 text-left align-middle text-white shadow-xl">
            <Dialog.Title as="h3" className="text-2xl font-medium leading-6">
              Erro!
            </Dialog.Title>
            <div className="mt-2">
              <p className="text-xl">{props.error}</p>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
