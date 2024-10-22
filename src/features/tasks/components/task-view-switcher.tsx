"use client";

import { Loader, PlusIcon } from "lucide-react"
import { useQueryState } from "nuqs";

import { useCreateProjectModal } from "@/features/projects/hooks/use-create-project-modal"
import { useGetTasks } from "@/features/tasks/api/use-get-tasks";
import { useWorkSpaceId } from "@/features/workspaces/hooks/useWorkspaceId";
import { DataFilters } from "@/features/tasks/components/data-filters";
import { useTaskFilters } from "@/features/tasks/hooks/use-task-filters";

import { Button } from "@/components/ui/button"
import { 
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@/components/ui/tabs"
import { DottedSeperator } from "@/components/dotted-seperator"

const TaskViewSwitcher = () => {
    const [{
        assigneeId,
        dueDate,
        projectId,
        status
    }] = useTaskFilters();

    const [view, setView] = useQueryState("task-view", {
        defaultValue: "table",
    })

    const workspaceId = useWorkSpaceId();

    const { data: tasks, isLoading: isTasksLoading } = useGetTasks({ 
        workspaceId,
        assigneeId,
        dueDate,
        projectId,
        status
    });
    const { open } = useCreateProjectModal();

    return (
        <Tabs onValueChange={setView} value={view} className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="tabs-switcher">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="table"
                        >
                            Table
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="kanban"
                        >
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger
                            className="h-8 w-full lg:w-auto"
                            value="calendar"
                        >
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button
                        onClick={open}
                        size={"sm"}
                        className="lg:w-auto w-full"
                    >
                        <PlusIcon className="size-4 mr-2" />
                        New
                    </Button>
                </div>
                <DottedSeperator className="my-4" />
                    <DataFilters />
                <DottedSeperator className="my-4" />
                {isTasksLoading ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="text-muted-foreground size-5 animate-spin" />
                    </div>
                    ) : 
                    <>
                        <TabsContent value="table" className="mt-0">
                            Data Table
                        </TabsContent>
                        <TabsContent value="kanban" className="mt-0">
                            Kanban
                        </TabsContent>
                        <TabsContent value="calendar" className="mt-0">
                            Calendar
                        </TabsContent>
                    </>
                }
            </div>
        </Tabs>
    )
}

export default TaskViewSwitcher