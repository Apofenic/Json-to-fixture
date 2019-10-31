# Json-to-fixture

  This script will take any .json file and convert it into a javascript object
  and then add it to a fixture file.
  by default, it will append all .json files in the "JSONs" directory 
  to the Campaign Fixture.
  5 arguments can be passed into this script

  if anything is passed in the first argument, it will replace the current fixture with new data, if an empty string is passed,
  it will append the new data to the end of the existing fixture file.

  The second argument will set a specific fixture collection to add the json file to.  If empty string, it will default to 'Campaigns'.

  The third will add a specific .json file. If empty string, it will default to all files in the "jsons" directory inside fixtures.

  The fourth will set a specific name for the object after it has been added to the fixture. If empty string, it 
  will default to the name of the campaign with a random hash at the end  i.e. "campaign_name_UI3748D0"

  The fifth will set a relative base directory to pull json file from. If empty string, it will default to '../src/requests/fixtures/jsons'

  example with arguments: "node addFixture reset Creatives test.json fixture_4 ../src/fixtures/myJSONfolder"
