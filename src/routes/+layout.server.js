export const load = (async ({ locals }) => {
    const { name, email } = locals;
  
    return { name, email };
})