export const fetchUserDashboardData = async (): Promise<any> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                courses: [
                    { id: '1', name: 'Course A' },
                    { id: '2', name: 'Course B' },
                ],
                progress: '50% completed',
                achievements: [
                    { id: '1', name: 'Achievement X' },
                    { id: '2', name: 'Achievement Y' },
                ],
            });
        }, 1000); // Simulating a delay of 1 second
    });
};
