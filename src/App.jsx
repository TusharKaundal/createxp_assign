import { Button } from "@/components/ui/button";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { Plus, Search, Filter, ArrowUpDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useMemo, useState } from "react";
import { ClientTable } from "@/components/clientTable";
import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";
// import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { sortOptions, tabList } from "./lib/constant";
import { mockClients } from "./lib/mockData";
import SortPanel from "./components/sortPanel";

function App() {
  const [activeTab, setActiveTab] = useState("all");
  const [showSortPanel, setShowSortPanel] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(sortOptions);
  const [appliedsortCriteria, setAppliedSortCriteria] = useState([]);


  const filteredClients = useMemo(() => {
    let filtered = mockClients;

    if (activeTab === "individual") {
      filtered = mockClients.filter((client) => client.type === "Individual");
    } else if (activeTab === "company") {
      filtered = mockClients.filter((client) => client.type === "Company");
    }

    return filtered;
  }, [activeTab]);
  return (
    <div className="min-h-screen bg-gray-50/50">
      <div className="sm:mx-10 px-6 transition-[margin] duration-300 ease-in-out">
        {/* Header */}
        <div className="border-b-1 py-4 border-gray-200">
          <h1 className="text-2xl font-semibold text-gray-900">Clients</h1>
        </div>

        <div className="flex">
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center py-2">
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList
                  className={`flex justify-between items-center gap-3 bg-transparent relative`}
                >
                  {tabList.map((item) => (
                    <TabsTrigger
                      key={item}
                      value={item}
                      className="hover:cursor-pointer shadow-none data-[state=active]:shadow-none"
                    >
                      <div className="flex flex-col relative">
                        <p className="capitalize">{item}</p>
                        <span
                          className={`w-full h-[3px] bg-black  transition-all absolute duration-100 ease-in-out rounded-tl-[5px] rounded-tr-[5px] ${
                            activeTab === item
                              ? "opacity-100 -bottom-4"
                              : "opacity-0 -bottom-4.5"
                          }`}
                        ></span>
                      </div>
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
              <div className="flex items-center gap-1">
                <Button
                  size="icon"
                  className="bg-transparent shadow-none hover:bg-gray-100"
                >
                  <Search className="h-4 w-4 text-gray-500" />
                </Button>

                <Popover
                  open={showSortPanel}
                  onOpenChange={() => setShowSortPanel((prev) => !prev)}
                >
                  <PopoverTrigger asChild>
                    <Button
                      size="icon"
                      className="relative bg-transparent shadow-none hover:bg-gray-100"
                    >
                      <ArrowUpDown className="h-4 w-4 text-gray-500" />
                      <Badge className="absolute top-0 right-0 h-4 w-4 rounded-full p-0 flex items-center justify-center text-xs bg-red-600">
                        2
                      </Badge>
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="absolute z-200 -right-2 p-4 shadow-sm border rounded-sm bg-white opacity-100 w-full min-w-150 ">
                    <SortPanel sortCriteria={sortCriteria} />
                  </PopoverContent>
                </Popover>

                <Button
                  size="icon"
                  className="bg-transparent shadow-none hover:bg-gray-100"
                >
                  <Filter className="h-4 w-4 text-gray-500" />
                </Button>
                <Button className="bg-black hover:bg-gray-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Client
                </Button>
              </div>
            </div>
            <div>
              <ClientTable clients={filteredClients} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
