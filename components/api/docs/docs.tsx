"use client"

import {
  Code,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react"

function ApiDocs() {
  return (
    <main className="mx-auto md:max-w-7xl z-10 justify-center items-center mb-12 flex flex-col items-center max-md:mx-4">
      <div className="flex justify-center items-center mx-auto">
        <div className="mt-8">
          <div className="w-full prose prose-neutral mb-10">
            <h1 className="text-center flex text-6xl max-md:text-2xl font-semibold dark:text-white mb-4 ">
              Applio API
            </h1>
            <p className="mb-3 break-words max-md:max-w-sm">
              Welcome to the Applio API documentation! Our API is simple, fast
              and free, however, before you start using it, it is important that
              you consult our documentation.
            </p>
            <Divider className="h-1 rounded-xl" />
          </div>
          <div className="my-4">
            <h2 className="text-center flex text-4xl max-md:text-xl font-semibold dark:text-white">
              API Reference
            </h2>
            <Divider className="my-2" />
          </div>
          <article className="max-md:max-w-sm">
            <h2 className="text-center flex text-4xl max-md:text-xl font-semibold dark:text-white">
              Get All Models
            </h2>
            <p className="my-4 max-md:max-w-sm">
              Retrieve information about multiple models using the following API
              endpoint:
            </p>
            <div className="w-full prose prose-neutral my-8 max-md:max-w-sm hidden md:block">
              <Code
                size="lg"
                className="w-full max-md:text-[9px] break-words select-all max-md:max-w-sm"
              >
                <span className="text-[#ff9492]">GET</span>{" "}
                <span className="text-[#91cbff]">
                  https://api.applio.org/key=(secret)/models/perpage=(number)/page=(number)?type=(string)
                </span>
              </Code>
            </div>
            <Table removeWrapper className="max-md:max-w-sm">
              <TableHeader>
                <TableColumn>PARAMETER</TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>perpage</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>
                    Required. Number of models to view (max 25).
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>page</TableCell>
                  <TableCell>Number</TableCell>
                  <TableCell>Required. Page number to be displayed</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>type</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Optional. Type of model to fetch.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </article>
          <article className="max-md:max-w-sm">
            <h2 className="text-center flex text-4xl max-md:text-xl font-semibold dark:text-white mt-10">
              Search Models
            </h2>
            <p className="my-4">
              Search for specific models by name using the following API
              endpoint:
            </p>
            <div className="w-full prose prose-neutral my-8 hidden md:block">
              <Code
                size="lg"
                className="w-full max-md:text-[9px] break-words select-all"
              >
                <span className="text-[#ff9492]">GET</span>{" "}
                <span className="text-[#91cbff]">
                  https://api.applio.org/key=(secret)/models/search?name=(model_name)&type=(kits.ai
                  / rvc)
                </span>
              </Code>
            </div>
            <Table removeWrapper className="max-md:max-w-sm">
              <TableHeader>
                <TableColumn>PARAMETER</TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>search</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>
                    Required. Name of model to fetch (min 3 letters).
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>type</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Optional. Type of model to fetch.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </article>
          <article className="max-md:max-w-sm">
            <h2 className="text-center flex text-4xl max-md:text-xl font-semibold dark:text-white mt-10">
              Search User Models
            </h2>
            <p className="my-4">
              To find specific models based on their associated usernames:
            </p>
            <div className="w-full prose prose-neutral my-8 hidden md:block">
              <Code
                size="lg"
                className="w-full max-md:text-[9px] break-words select-all"
              >
                <span className="text-[#ff9492]">GET</span>{" "}
                <span className="text-[#91cbff]">
                  https://api.applio.org/key=(secret)/models/user=(username)?type=(kits.ai
                  / rvc)
                </span>
              </Code>
            </div>
            <Table removeWrapper aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>PARAMETER</TableColumn>
                <TableColumn>TYPE</TableColumn>
                <TableColumn>DESCRIPTION</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>user</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>
                    Required. User owner of the models you want to see (min 3
                    letters).
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>type</TableCell>
                  <TableCell>String</TableCell>
                  <TableCell>Optional. Type of model to fetch.</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </article>
          <article>
            <h2 className="text-center flex text-4xl max-md:text-xl font-semibold dark:text-white mt-10">
              Check API Status
            </h2>
            <p className="my-4">Check the latency of the API.</p>
            <div className="w-full prose prose-neutral my-8 hidden md:block">
              <Code
                size="lg"
                className="w-full max-md:text-[9px] break-words select-all"
              >
                <span className="text-[#ff9492]">GET</span>{" "}
                <span className="text-[#91cbff]">
                  https://api.applio.org/ping
                </span>
              </Code>
            </div>
            <p className="my-8 font-bold">
              Make sure to replace (secret) in the API endpoints with your
              actual API KEY to authenticate your requests.
            </p>
          </article>
          <div className="my-4 max-md:max-w-sm">
            <h2 className="text-center flex text-4xl max-md:text-xl font-semibold dark:text-white">
              Performance Testing
            </h2>
            <Divider className="my-2" />
            <p className="my-4">
              In the table below, you will find the results of our performance
              tests for the Applio API. We run these tests with every new
              release, and you can access all the logs here:
            </p>
            <Table isStriped aria-label="Example static collection table">
              <TableHeader>
                <TableColumn>REQUEST COUNT</TableColumn>
                <TableColumn>RESPONSE TIME</TableColumn>
                <TableColumn>VERSION</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell>100</TableCell>
                  <TableCell>1.0s</TableCell>
                  <TableCell>Beta</TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell>250</TableCell>
                  <TableCell>1.1s</TableCell>
                  <TableCell>Beta</TableCell>
                </TableRow>
                <TableRow key="3">
                  <TableCell>500</TableCell>
                  <TableCell>1.4s</TableCell>
                  <TableCell>Beta</TableCell>
                </TableRow>
                <TableRow key="4">
                  <TableCell>1000</TableCell>
                  <TableCell>1.6s</TableCell>
                  <TableCell>Beta</TableCell>
                </TableRow>
                <TableRow key="5">
                  <TableCell>100</TableCell>
                  <TableCell>0.3s</TableCell>
                  <TableCell>1.0</TableCell>
                </TableRow>
                <TableRow key="6">
                  <TableCell>250</TableCell>
                  <TableCell>0.5s</TableCell>
                  <TableCell>1.0</TableCell>
                </TableRow>
                <TableRow key="7">
                  <TableCell>500</TableCell>
                  <TableCell>0.9s</TableCell>
                  <TableCell>1.0</TableCell>
                </TableRow>
                <TableRow key="8">
                  <TableCell>1000</TableCell>
                  <TableCell>1.3s</TableCell>
                  <TableCell>1.0</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </main>
  )
}
export default ApiDocs
