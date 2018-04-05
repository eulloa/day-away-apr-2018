(async () => {
  const banzaiAPI = '//banzai-api-web.us-west-2.test.expedia.com';
  const primerAPI = '//primer.builds.tools.expedia.com'
  const appName = 'shopping-pwa';

  try {
    // const buildFetchResponse = await fetch(`${primerAPI}/job/${appName}-master/lastBuild/api/json?tree=result`, {
    //   mode: 'no-cors'
    // });
    // const buildFetchJson = await buildFetchResponse.json();

    const instanceFetchResponse = await fetch(`${banzaiAPI}/v2/workflow-instances/?workflowName=${appName}`);
    const instanceFetchJson = await instanceFetchResponse.json();
    const firstInstance = instanceFetchJson && instanceFetchJson._embedded && instanceFetchJson._embedded[0];
    const workflowInstanceId = firstInstance && firstInstance.id;

    const dataFetchResponse = await fetch(`${banzaiAPI}/v2/workflow-instances/${workflowInstanceId}?include=stepInstances/successChildren,stepInstances/parents,stepInstances/step`);
    const dataFetchJson = await dataFetchResponse.json();

    if (chrome && chrome.runtime && typeof chrome.runtime.sendMessage === 'function') {
      chrome.runtime.sendMessage(dataFetchJson);
    }
  }
  catch(e) {
    if (chrome && chrome.runtime && typeof chrome.runtime.sendMessage === 'function') {
      chrome.runtime.sendMessage({
        error: true
      });
    }
  }
})();
