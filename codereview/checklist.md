
* **Readable and following standards** ?
  * style, naming : variable/methods/class names
    * There are only two hard things in Computer Science: cache invalidation and naming things. -- Phil Karlton
    * if you can't find a name, it does perhaps too much
    * http://blog.codinghorror.com/code-smells/
  * [squint test](http://robertheaton.com/2014/06/20/code-review-without-your-eyes/) and [single screen test](https://mestachs.wordpress.com/2012/11/26/through-the-eyes-of-sonar-complexity/)
  * no commented/test/debug/todo code left
  * follow guidelines/best practices depending of the technology reviewed
     * [Java](http://google.github.io/styleguide/javaguide.html) : use sonar to [enforce most of them](https://mestachs.wordpress.com/2013/12/23/through-the-eyes-of-sonar-recap/), [Maven](https://mestachs.wordpress.com/2012/05/17/maven-best-practices/)
     * [Javascript](https://github.com/airbnb/javascript/blob/master/README.md) : check [eslint](http://eslint.org/), [JQuery](http://lab.abhinayrathore.com/jquery-standards/), [React](https://github.com/airbnb/javascript/tree/master/react), [AngularJs](https://github.com/johnpapa/angular-styleguide#table-of-contents)
     * [Ruby](https://github.com/bbatsov/ruby-style-guide) (see rubocop or pullreview)
     * you should know when it's ok to deviate, tailor them for your team
  * Prefer coherence vs following blindly the current standard
     * if a code base is completly written with another standard (Service/Manager/Repository/Bean/Model/Presenter/Controller/Resources/…) stay in this standard, be coherent.
     * If it’s really a pain plan with your team if it should really be migrated to new standard.

* **Minimal and working solution** ?
  * to prove it's working the unit tests, integration tests should be updated
    * test at the right level
    * self contained, short, independent
    * follow [SetupExerciseVerifyTearDown](http://xunitpatterns.com/Four%20Phase%20Test.html)
    * use [assertj](http://joel-costigliola.github.io/assertj/) for meaningful error message
    * not too much mocks (god class under test)
    * good [coverage](http://eclemma.org/) (is my production code tested), 
    * good [mutation coverage](http://pitest.org/) (do I have good asserts/tests ?)
    * good data coverage (unicode, long/short/various case/empty, null, multiline,... Integer.MAX - 1)
    * no ignored/commented test
    * no off-by-one errors (we often messup of 1 in index/ < vs <= /...)
  * no obvious bug : classcast, npe,...
  * efficient
    * select n+1, missing index,...
  * meets requirements
    * explicit : story and analysis
    * implicit : i18n, IE 8, ...
  * impact the [expected parts](http://www.lornajane.net/posts/2015/code-reviews-before-you-even-run-the-code) of the system
    * concise change, not too much extra/unrelated changes
    * what is actually trying to be achieved, does it need to be done and is there a better (maybe completely different) way to do it
  * [Code smells](http://blog.codinghorror.com/code-smells/) ?
    * some of them are already detected at "readable" change.
    * no duplication : follow the “three strikes” rule
    * no use of deprecated api
  * Bug fix ? 
     * Does it fix the root cause or only the symptom ? [5-Whys](https://en.wikipedia.org/wiki/5_Whys)
     * Any other places where similar problems can arise ? (duplicated/similar usage pattern)
  * [DDD](http://www.infoq.com/minibooks/domain-driven-design-quickly) ? 
     * mostly/completely immutable 
     * [checkRep](http://www.pgbovine.net/programming-with-rep-invariants.htm)
     * hexagonal architecture

* **Better than before** ?
  * boyscout rule : "Always leave the campground cleaner than you found it."
  * non regression or improvement in [SonarQube](http://www.sonarqube.org/), [PullReview](https://www.pullreview.com/),  [CodeClimate](https://codeclimate.com/),...
  * new tests, better readable tests

* **Production ready** ?
  * encoding
    * utf-8 everywhere !
  * migration won't break (not null without default, too big table to update)
  * [error handling](https://mestachs.wordpress.com/2012/10/10/through-the-eyes-of-sonar-exception-handling/) :
    * close resources in finally
    * don't expose sensitive information to caller
    * exception logging with extra details
  * timeout, threadpool, connection pool : ideally adjustable
  * unexpected dependency (in WEB-INF/lib, Gemfile,...) ?
    * pom change, [maven enforcer](https://maven.apache.org/enforcer/enforcer-rules/bannedDependencies.html), [pendantic pom enforcer](https://github.com/ferstl/pedantic-pom-enforcers#pedantic-pom-enforcers)
    * duplicate, new unnecessary jars, test jars, [duplicated classes](https://github.com/mestachs/archeo4j#archeo4j)
    * http://tattletale.jboss.org/
  * changelog/wiki/docker/ansible/... documentation/scripts updated
  * [secure](https://speakerdeck.com/mestachs/betatech-security-for-dummies?slide=38)
    * no clear vulnerabilities introduced or re-introduced (in [your code](https://www.owasp.org/images/f/fa/Code_Review_Guide_Pre-AlphaV2_(1).pdf) or a [dependency](https://www.owasp.org/index.php/OWASP_Dependency_Check))
    * prevent sql injection : PreparedStatement or ORM (no string concat)
    * prevent xss : 
      * escape user input in view rendering (c:out, fn:escapeXml, th:utext, html_safe)
      * specify [http header](https://www.owasp.org/index.php/List_of_useful_HTTP_headers), don't inline your js
    * improve security [awareness](http://www.ikangae.net/application-security/4-ways-to-improve-your-web-security/)
  * [load tested](https://speakerdeck.com/mestachs/gatling-load-testing-like-a-king) ?
    * resources leak (memory, connection, file descriptor, ...)
    * race condition, dead locks,...
    * performance

more on the subject
 * http://kevinlondon.com/2015/05/05/code-review-best-practices.html
 * http://blog.codinghorror.com/code-reviews-just-do-it/
 * https://www.future-processing.pl/blog/another-code-review-best-practices/
 * http://blogs.atlassian.com/2010/03/code_review_in_agile_teams_part_ii/
 * http://blog.8thcolor.com/en/2014/04/5-reasons-you-are-not-doing-code-reviews/
 * http://blog.8thcolor.com/en/2013/10/we-dont-have-time-for-code-reviews/
 * http://blog.fogcreek.com/increase-defect-detection-with-our-code-review-checklist-example/
 * http://smartbear.com/smartbear/media/pdfs/wp-cc-11-best-practices-of-peer-code-review.pdf
 * https://gist.github.com/bwest87/10049924
