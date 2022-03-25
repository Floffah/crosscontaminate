import { Dialog, Transition } from "@headlessui/react";
import { forwardRef, Fragment } from "react";
import { Input } from "src/components/input/Input";
import { Select } from "src/components/input/Select";

export const CreateProviderModal = forwardRef<
    HTMLDivElement,
    {
        onClose: () => void;
    }
>(({ onClose }, ref) => {
    return (
        <Dialog
            as="div"
            onClose={onClose}
            className="fixed inset-0 z-10"
            ref={ref}
        >
            <div className="min-h-screen px-4 text-center">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-black/30" />
                </Transition.Child>

                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <div className="pointer-events-none fixed top-0 left-0 flex h-full w-full items-center justify-center">
                        <div className="pointer-events-auto w-fit max-w-md transform rounded-lg bg-stone-800 px-6 py-4 shadow-xl transition-all">
                            <Dialog.Title
                                as="h1"
                                className="text-lg font-medium leading-6 text-stone-300"
                            >
                                Create provider
                            </Dialog.Title>
                            <Dialog.Description
                                as="p"
                                className="text-sm text-stone-500"
                            >
                                Create a backup/sync provider that
                                Crosscontaminate can use to backup projects and
                                sync them across platforms. You can create
                                multiple of these.
                            </Dialog.Description>
                            <Input
                                placeholder="Provider name"
                                className="mt-4 inline-block !w-5/12 !px-2 !py-1"
                            />
                            <Select
                                className="ml-2 inline-block !w-5/12"
                                buttonClassName="text-left"
                                onChange={() => {}}
                                options={[
                                    {
                                        value: "github",
                                        label: "GitHub",
                                    },
                                ]}
                            />
                        </div>
                    </div>
                </Transition.Child>
            </div>
        </Dialog>
    );
});
CreateProviderModal.displayName = "CreateProviderModal";
