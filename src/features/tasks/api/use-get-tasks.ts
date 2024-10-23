import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

import { TaskStatus } from "@/features/tasks/types";

interface useGetTasksProps {
    workspaceId: string;
    projectId?: string | null;
    status?: TaskStatus | null;
    assigneeId?: string | null;
    dueDate?: string | null;
    search?: string | null;
};

export const useGetTasks = ({
    workspaceId,
    assigneeId,
    dueDate,
    projectId,
    status,
    search
}: useGetTasksProps) => {
    const query = useQuery({
        queryKey: [
            "tasks",
            workspaceId,
            projectId,
            status,
            assigneeId,
            dueDate,
            search
        ],
        queryFn: async () => {
            const response = await client.api.tasks.$get({ query: { 
                workspaceId,
                projectId: projectId ?? undefined,
                status: status ?? undefined,
                assigneeId: assigneeId ?? undefined,
                search: search ?? undefined,
                dueDate: dueDate ?? undefined,
            } });

            if(!response.ok){
                throw new Error("Failed to fetch tasks");
            }

            const { data } = await response.json();

            return data;
        },
    });

    return query;
}