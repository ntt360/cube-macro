<div class="wrapper __cubeName__" c-hide={{!big_title.title}}>
    <a class="title" href="{{big_title.url}}" title="{{big_title.title}}" target="_blank">{{big_title.title}}</a>
    <hr class="split-line">
    <ul class="list">
        {{#list small_title as item by item_index}}
        <li>
            <a href="{{item.url}}" title="{{item.title}}" target="_blank">{{item.title}}</a>
        </li>
        {{/list}}
    </ul>
</div>
<img src="assets/launchimg.png" c-show={{!big_title.title}} />