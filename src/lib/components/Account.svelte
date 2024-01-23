<!-- <script>
  import { selectedAccount } from '../../stores/selectedAccountStore';
</script>

<div id="details" class="basis-2/6 bg-teal-100 rounded-lg mt-10 lg:mt-0 p-10">
  <h2>Details</h2>
  <p>{$selectedAccount.id}</p>
  <p>{$selectedAccount.name}</p>
  <p>{$selectedAccount.email}</p>
</div> -->

<script>
  async function getAllAccounts() {
    const res = await fetch(`https://aa-apigateway-sprint-2-2.onrender.com/accountsApi/accounts`);
    const values = await res.json();
    return values;
  }

  let accountsPromises = getAllAccounts();
</script>

<section>
  <div>
    <ul>
      {#await accountsPromises}
        <li>...waiting</li>
      {:then accounts}
        {#each accounts.data as account}
          <li>{account.name}</li>
        {/each}
      {:catch error}
        <li>Error: {error.message}</li>
      {/await}
    </ul>
  </div>
</section>

