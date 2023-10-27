"use client"
import React from 'react';
import { Tabs, Tab, Button } from "@nextui-org/react";
import UsersTable from "./tables/users-table";
import ModelsTable from "./tables/models-table";
import { Bot, User, Text } from 'lucide-react';
import BlogsTable from './tables/blogs-table';

interface tabsprops {
  id: string;
}

function TabsComponent({ id }: tabsprops) {
  return (
        <div>
            <div className="flex w-full flex-col">
      <Tabs aria-label="Options" className='mx-auto justify-center' size='lg' color='success' defaultSelectedKey="users">
        <Tab key="users" title={
        <div className="flex items-center space-x-2">
              <User />
              <span>Users</span>
        </div>} 
        >
          <UsersTable id={id}/>
        </Tab>
        <Tab key="models" title={
        <div className="flex items-center space-x-2">
              <Bot />
              <span>Models</span>
        </div>} 
        >
          <ModelsTable id={id} />
        </Tab>
        <Tab key="blog" title={
        <div className="flex items-center space-x-2">
              <Text />
              <span>Blog</span>
        </div>} 
        >
           <BlogsTable id={id} />
        </Tab>
      </Tabs>
    </div>  
        </div>
  );
}

export default TabsComponent;
