const useRefetch = (refetch, data) => {
    if (window.history.mustRefetch) {
        delete window.history.mustRefetch;
        if (data)
            return refetch(data);
        refetch();
    }
}

export default useRefetch;
