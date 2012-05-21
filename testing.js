var nano=require('./nano2.js')('http://localhost:5984');
var mycouchdb = null;
nano.db.create('foodb', function(err, body) {
  if(!err) {console.log('Created db /foodb')};
  mycouchdb = nano.use('foodb');
  runTests();
});

runTests = function() {
  console.log('Trying nano.relax(\'_uuids\'):');
  nano.relax('_uuids', function(err, body) {
    if(!err){console.log('  nano.relax(\'_uuids\'):\n    '
       +JSON.stringify(body.uuids));}
    else {console.log('  nano.relax(\'_uuids\') error: \n'+err)};
  });

  console.log('Trying mycouchdb.newid(fn):');
  mycouchdb.newid(function(err, id_string){
    if(!err){console.log('  mycouchdb.newid():\n    '
      +JSON.stringify(id_string))}
    else {console.log('  mycouchdb.newid() error: \n    '+err)};
  });

  console.log('Trying nano.newid(2,fn):')
  nano.newid(2, function(err, id_strings_arr){
    if(!err){console.log('  nano.newid(2,fn):\n    '
      +JSON.stringify(id_strings_arr))}
    else {console.log('  nano.newid(2,fn) error: \n    '+err)};
  });


  console.log('Trying mycouchdb.newid(1,2,1,fn):')
  mycouchdb.newid(1,2,1,function(err, id_strings_array){
    if(!err){console.log('  mycouchdb.newid(1,2,1,fn):\n    '
      +JSON.stringify(id_strings_array))}
    else {console.log('  mycouchdb.newid(1,2,1,fn) error:\n    '+err)};
  });
};
