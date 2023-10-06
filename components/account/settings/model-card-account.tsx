import React, { useEffect, useState } from "react";
import { Card, CardBody, CardFooter, CardHeader, Divider, Chip, Button, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem, Link, Checkbox, Tooltip, useDisclosure, Modal, ModalContent, ModalFooter, ModalBody,  ModalHeader } from "@nextui-org/react";
import { Delete, MoreVertical, Trash2 } from "lucide-react";
import { addPost } from "@/app/actions/delete-post-action";
import { redirect, useRouter } from 'next/navigation'


export default function AccountModelCard({
  imageUrl,
  name,
  created_at,
  id,
  userFullName,
  link,
  epochs,
  version,
  type,
  algorithm,
  author_id
}: {
  imageUrl: string;
  name: string;
  created_at: string;
  id: string;
  userFullName?: string;
  link: string;
  epochs: string;
  version: string;
  type: string;
  algorithm: string;
  author_id: string;
}) {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const router = useRouter()

  const handleDeletePost = async () => {
    const formData = new FormData();
    formData.append("id", id);
    formData.append("author_id", author_id);

    await addPost(formData);
  };
  
  return (
    <Card className="h-[200px] relative">
    <Dropdown backdrop="blur">
    <DropdownTrigger>
    <div
      className="absolute top-4 right-2 z-30"
      color="foreground"
    >
      <MoreVertical />
    </div>
    </DropdownTrigger>
    <DropdownMenu aria-label="Static Actions">
        <DropdownItem key="edit" isDisabled>Edit {name}</DropdownItem>
        <DropdownItem key="delete" className="text-danger" color="danger" onClick={onOpen}>
          Delete {name}
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>

 <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop='blur'>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1"><span className="bg-gradient-radial-red text-transparent bg-clip-text text-2xl">Warning</span>You are going to  delete a model.</ModalHeader>
              <ModalBody>
                <p> 
                Please note that this action is irreversible, once you press the delete button there is no way back, we will delete the model data from our database for both the web and the bot.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="primary" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="danger" onPress={handleDeletePost}>
                  Delete
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>



    <CardBody className="h-[calc(100% - 40px)]">
      <div className="max-w-[200px]">
        <h1 className="text-xl break-words">
          {name !== "" ? name : "Unknown name"}
        </h1>
      </div>
      <h2 className="lg">{epochs !== "" ? epochs + " Epochs" : "Unknown epochs"}</h2>
      <h2 className="lg">{type !== "" ? type : "Unknown type"}</h2>
    </CardBody>
    <CardFooter style={{ fontSize: "smaller" }}></CardFooter>
  </Card>
);
}