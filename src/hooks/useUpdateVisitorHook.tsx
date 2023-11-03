import { useMutation } from "@tanstack/react-query";

export const updateVisitor = async (visitorId) => {
    const res = await fetch(`/api/visitor/${visitorId}`, {
        method: "PUT",
    });
    return res.json();
};

export const useUpdateVisitorHook = (visitorId) => {
    return useMutation({
        queryKey: ["update-visitor"],
        queryFn: updateVisitor(visitorId),
    });
};