<!DOCTYPE html>
<html>
<head>
  <title>Venus Test Harness </title>
  <!--[if lte IE 7]>
  <script type="text/javascript" src="/js/json2.js"></script>
  <![endif]-->
  <script type="text/javascript" src="/js/socketio/socket.io.min.js"></script>
  <script type="text/javascript" src="/js/runner_client/VenusClientLibrary.js"></script>
  <script type="text/javascript" src="/js/runner_client/venus.js"></script>
  <script type="text/javascript">
    window.venus.postUrl = '{postTestResultsUrl}';
    window.venus.fixtureReset = Boolean({fixtureReset});
    window.venus.testId  = {testId};
  </script>
  <link rel="stylesheet" type="text/css" href="/css/app.css">
</head>
<body>
  check your console for test results
  <iframe src="{testSandboxUrl}" id="sandbox">
  <!--Running test: {testId}-->
</body>
</html>
