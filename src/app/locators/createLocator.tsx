"use client";

import { createLocator } from "@/actions/locators";
import { Add } from "@mui/icons-material";
import {
  Button,
  Input,
  ModalFooter,
  useDisclosure,
  Modal,
  ModalBody,
  ModalHeader,
  ModalContent,
} from "@nextui-org/react";
import { useForm } from "@tanstack/react-form";
import { zodValidator } from "@tanstack/zod-form-adapter";
import { useState } from "react";
import { z } from "zod";

export default function CreateLocator() {
  const [showServerError, setShowServerError] = useState(false);
  const form = useForm({
    defaultValues: {
      name: "",
      module: "",
      value: "",
      file: "",
    },
    onSubmit: async ({ value }) => {
      try {
        const res = await createLocator(value);
        if (!res.success) {
          console.error(res.error);
          setShowServerError(true);
        }
        if (res.success) {
          onClose();
          setShowServerError(false);
        }
      } catch (error) {
        console.error(error);
      }
    },
    validatorAdapter: zodValidator(),
  });
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const handleModalOpen = () => {
    onOpen();
    setShowServerError(false);
  };
  return (
    <>
      <Button onPress={handleModalOpen} color="primary" endContent={<Add />}>
        Create Locator
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Create Locator
                </ModalHeader>
                <ModalBody>
                  <div
                    className={
                      showServerError
                        ? "bg-danger-300 text-slate-300 p-4 rounded-lg"
                        : "bg-danger-300 text-slate-300 p-4 rounded-lg hidden"
                    }
                  >
                    <p className="text-sm">
                      Please ensure that locator and module name combination is
                      unique.
                    </p>
                  </div>
                  <form.Field
                    name="name"
                    validators={{
                      onChange: z.string().min(1, {
                        message: "At least a single character is required",
                      }),
                    }}
                    children={(field) => {
                      return (
                        <>
                          <Input
                            size="sm"
                            id={field.name}
                            label={
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)
                            }
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            isInvalid={
                              field.state.meta.touchedErrors.length > 0
                                ? true
                                : false
                            }
                            errorMessage={field.state.meta.touchedErrors}
                          />
                        </>
                      );
                    }}
                  />
                  <form.Field
                    name="module"
                    validators={{
                      onChange: z.string().min(1, {
                        message: "At least a single character is required",
                      }),
                    }}
                    children={(field) => {
                      return (
                        <>
                          <Input
                            size="sm"
                            id={field.name}
                            label={
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)
                            }
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            isInvalid={
                              field.state.meta.touchedErrors.length > 0
                                ? true
                                : false
                            }
                            errorMessage={field.state.meta.touchedErrors}
                          />
                        </>
                      );
                    }}
                  />
                  <form.Field
                    name="value"
                    validators={{
                      onChange: z.string().min(1, {
                        message: "At least a single character is required",
                      }),
                    }}
                    children={(field) => {
                      return (
                        <>
                          <Input
                            size="sm"
                            id={field.name}
                            label={
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)
                            }
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            isInvalid={
                              field.state.meta.touchedErrors.length > 0
                                ? true
                                : false
                            }
                            errorMessage={field.state.meta.touchedErrors}
                          />
                        </>
                      );
                    }}
                  />
                  <form.Field
                    name="file"
                    validators={{
                      onChange: z.string().min(1, {
                        message: "At least a single character is required",
                      }),
                    }}
                    children={(field) => {
                      return (
                        <>
                          <Input
                            size="sm"
                            id={field.name}
                            label={
                              field.name.charAt(0).toUpperCase() +
                              field.name.slice(1)
                            }
                            name={field.name}
                            value={field.state.value}
                            onBlur={field.handleBlur}
                            onChange={(e) => field.handleChange(e.target.value)}
                            isInvalid={
                              field.state.meta.touchedErrors.length > 0
                                ? true
                                : false
                            }
                            errorMessage={field.state.meta.touchedErrors}
                          />
                        </>
                      );
                    }}
                  />
                </ModalBody>
                <ModalFooter>
                  <Button variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <form.Subscribe
                    selector={(state) => [state.canSubmit, state.isSubmitting]}
                    children={([canSubmit, isSubmitting]) => (
                      <Button
                        type="submit"
                        color="primary"
                        disabled={!canSubmit}
                      >
                        {isSubmitting ? "..." : "Submit"}
                      </Button>
                    )}
                  />
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </form>
      </Modal>
    </>
  );
}
