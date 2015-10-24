
* **Readable and following standards** ?
  * style, naming : variable/methods/class names
    * There are only two hard things in Computer Science: cache invalidation and naming things. -- Phil Karlton
    * if you can't find a name, it does perhaps too much
    * http://blog.codinghorror.com/code-smells/
  * squint test, single screen test
  * no commented/test/debug/todo code left
  * follow guidelines/best practices depending of the technology reviewed
     * [Java](http://google.github.io/styleguide/javaguide.html) : use sonar to enforce most of them
     * [Javascript](https://github.com/airbnb/javascript/blob/master/README.md)
     * [JQuery](http://lab.abhinayrathore.com/jquery-standards/)
     * [Maven](https://mestachs.wordpress.com/2012/05/17/maven-best-practices/)
     * [Ruby](https://github.com/bbatsov/ruby-style-guide) (see rubocop or pullreview)
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
    * good coverage (is my production code tested), 
    * good mutation coverage (do I have good asserts/tests)
    * good data coverage (unicode, long/short/various case/empty, null, multiline,... Integer.MAX - 1)
    * no ignored/commented test
    * no off-by-one errors (we often messup of 1 in index/ < vs <= /...)
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
  * no use of deprecated api

* **Better than before** ?
  * boyscout rule : "Always leave the campground cleaner than you found it."
  * non regression or improvement in [sonar](http://www.sonarqube.org/), [PullReview](https://www.pullreview.com/),  [CodeClimate](https://codeclimate.com/),...
  * new tests, better readable tests

* **Production ready** ?
  * encoding
    * utf-8 everywhere !
  * exception logging with extra details
  * migration won't break (not null without default, too big table to update)
  * error handling :
    * close resources in finally
    * don't expose sensitive information to caller
  * timeout, connection pool : ideally adjustable
  * unexpected dependency (in WEB-INF/lib, Gemfile,...) ?
    * pom change, maven enforcer, pendantic pom enforcer
    * duplicate, new unnecessary jars, test jars, duplicated classes
    * http://tattletale.jboss.org/
  * changelog/wiki/docker/ansible/... documentation/scripts updated
  * [secure](https://speakerdeck.com/mestachs/betatech-security-for-dummies?slide=38)
    * no clear vulnerabilities introduced or re-introduced
  * [load tested](https://speakerdeck.com/mestachs/gatling-load-testing-like-a-king) ?
    * resources leak (memory, connection, file descriptor, ...)
    * race condition, dead locks,...
    * performance

