import { Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { CreateProviderModal } from "src/components/modal/CreateProviderModal";

export function ProviderSettings() {
    const [createModalOpen, setCreateModalOpen] = useState(false);

    return (
        <>
            <div className="max-h-16">
                <div
                    className="h-fit w-full cursor-pointer rounded border-2 border-dashed border-stone-600 py-2 px-4 text-center text-stone-600 hover:bg-stone-700/30"
                    onClick={() => setCreateModalOpen(true)}
                >
                    Add provider
                </div>
            </div>
            <Transition appear show={createModalOpen} as={Fragment}>
                <CreateProviderModal
                    onClose={() => setCreateModalOpen(false)}
                />
            </Transition>
        </>
    );
}
