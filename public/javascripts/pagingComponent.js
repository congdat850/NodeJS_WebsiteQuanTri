class PagingComponent extends HTMLElement{
    constructor(){
        super();
        this.listPage = [];
        this.currentPage;
        this.maxPage;
        this.destination;
    }
    connectedCallback() {
        this.currentPage = this.getAttribute('current-page') || 1;
        this.maxPage = this.getAttribute('max-page') || 5;
        this.destination = this.getAttribute('for') || "DanhSachDonDatHang";
        this.updateListPage();
        var wrapper = $("<div class='product-pagination text-center'></div>");
        var paging = $(`
            <nav>
                <ul class="pagination">`
                + this.getListPage() + `
                </ul>
            </nav>
        `);
        wrapper.append(paging);
        $(this).append(wrapper);
    }

    updateListPage(){
        if(this.maxPage <= 5){
            for(var i = 1; i <= this.maxPage;i++){
                this.listPage.push(i);
            }
        }
        else{
            if(this.currentPage > this.maxPage - 2){
                for(var i = maxPage - 4;i<=maxPage;i++){
                    this.listPage.push(i);
                }
            }
            else{
                if(this.currentPage < 3){
                    for(var i = 1;i<=5;i++){
                        this.listPage.push(i);
                    }
                }
                else{
                    for(var i = this.currentPage - 2;i<=this.currentPage + 2;i++){
                        this.listPage.push(i);
                    }
                }
            }
        }
    }

    getListPage(){
        var str="";
        var className = "";
        var me =this;

        // Previous
        var previous = this.listPage[0] > 1 ? this.listPage[0] - 1 : 1;
        str += `
        <li>
            <a href="/${this.destination}?page=${previous}" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>`
        this.listPage.forEach((element)=>{
            if(element == me.currentPage) className="active";
            else className = "";
            str +=`<li class="${className}"><a href="/${me.destination}?page=${element}">${element}</a></li>`;   
        });
        //Next
        var lastPage = this.listPage[this.listPage.length - 1];
        var next = this.maxPage > lastPage ? lastPage + 1 : this.maxPage ;
        str += `
        <li>
            <a href="/${this.destination}?page=${next}" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>`;
        return str;
    }
}

window.customElements.define("hd-paging",PagingComponent);