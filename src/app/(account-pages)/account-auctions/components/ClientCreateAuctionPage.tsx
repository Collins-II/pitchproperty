"use client";

import { Tab, TabGroup, TabPanel, TabPanels } from "@headlessui/react";
import ButtonSecondary from "@/shared/ButtonSecondary";
import { ClassifiedsTableRow } from "@/components/classified/classified-table-row";
import React, { useState } from "react";
import { Table, TableBody } from "@/components/ui/table";

interface Props {
  cars: any[]; // ideally type these properly
  properties: any[];
}

const ClientCreateAuctionPage: React.FC<Props> = ({ cars, properties }) => {
  const [categories] = useState(["Properties", "Cars"]);

  return (
    <div className="space-y-6 sm:space-y-8">
      <div>
        <h2 className="text-3xl font-semibold">Create Auction</h2>
      </div>
      <div className="w-14 border-b border-neutral-200 dark:border-neutral-700"></div>

      <div>
        <TabGroup>
          <TabPanels>
            <TabPanel className="mt-8">
              <Table>
                <TableBody>
                {cars?.filter((_, i) => i < 8).map((car) => (
                  <ClassifiedsTableRow key={car._id} classified={car} />
                ))}
                </TableBody>
              </Table>
              
              <div className="flex mt-11 justify-center items-center">
                <ButtonSecondary>Show me more</ButtonSecondary>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
};

export default ClientCreateAuctionPage;
