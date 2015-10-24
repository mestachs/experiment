
* **Readable and following standards** ?
  * style, naming : variable/methods/class names
    * There are only two hard things in Computer Science: cache invalidation and naming things. -- Phil Karlton
    * if you can't find a name, it does perhaps too much
    * http://blog.codinghorror.com/code-smells/
  * squint test, single screen test
  * no commented/test/debug/todo code left
  * follow guidelines/best practices depending of the technology reviewed
     * http://google.github.io/styleguide/javaguide.html use sonar to enforce most of them
     * https://github.com/airbnb/javascript/blob/master/README.md
     * http://lab.abhinayrathore.com/jquery-standards/
     * https://mestachs.wordpress.com/2012/05/17/maven-best-practices/
     * https://github.com/bbatsov/ruby-style-guide
     * you should know when it's ok to deviate, tailor them for your team
  * Prefer coherence vs following blindly the current standard
     * if a code base is completly written with another standard (Service/Manager/Repository/Bean/Model/Presenter/Controller/Resources/…) stay in this standard, be coherent.
     * If it’s really a pain plan with your team if it should really be migrated to new standard.

* **Minimal and working solution** ?
  * to prove it's working the unit tests, integration tests should be updated
    * test at the right level
    * self contained, short, independent
    * follow SetupExerciseVerifyTearDown
    * use assertj for meaningful error message
    * not too much mocks (god class under test)
    * coverage (is my production code tested), mutation coverage (do I have good asserts/tests)
    * no ignored/commented test
    * test with boundary case and boundary case -1/+1 (we often messup of 1 in index/comparison/...)
  * no obvious bug : classcast, npe,...
  * efficient
    * select n+1, missing index,...
  * meets requirements
    * explicit : story and analysis
    * implicit : i18n, IE 8, ...
  * impact the expected parts of the system
    * concise change, not too much extra/unrelated changes
    * what is actually trying to be achieved, does it need to be done and is there a better (maybe completely different) way to do it
  * no duplication : follow the “three strikes” rule

* **Better than before** ?
  * boyscout rule : "Always leave the campground cleaner than you found it."
  * non regression or improvement in sonar/pullreview/codeclimate/...
  * new test, better readable tests

* **Production ready** ?
  * encoding
    * utf-8
  * exception logging
  * migration won't break (not null without default, too big table to update)
  * error handling :
    * close resources in finally
    * don't expose sensitive information to caller
  * timeout, connection pool : ideally adjustable
  * unexpected dependency (in WEB-INF/lib, Gemfile,...) ?
    * pom change, maven enforcer, pendantic pom enforcer
    * duplicate, new unnecessary jars, duplicated classes
    * http://tattletale.jboss.org/
  * changelog/wiki/docker/ansible/... documentation/scripts updated
  * security
    * no clear vulnerabilities introduced or re-introduced
  * load tested ?
    * resources leak (memory, connection, file descriptor, ...)
    * race condition
    * performance

