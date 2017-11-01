
after generating the migration ask your self 
   * null: false ?
   * default value (specialy for boolean)
   * foreign key ?
   * uniqueness ?
   * index ?
   * don't use the directly app/model but a [least embed the needed models](https://railsguides.net/change-data-in-migrations-like-a-boss/) in the migration
   * if migrating data : [performance, memory efficiency](http://api.rubyonrails.org/classes/ActiveRecord/Batches.html)
   
during development is my db consistent with my model (or review)
   * dependent destroy in the model ?
   * nullalign: https://thomasleecopeland.com/2017/09/28/announcing-nullalign.html
   * foreignkeys: https://github.com/jenseng/immigrant
   * consistency_fail: https://8thlight.com/blog/colin-jones/2011/06/10/winning-at-consistency.html
   * my migration won't impose too much downtime : https://github.com/ankane/strong_migrations
