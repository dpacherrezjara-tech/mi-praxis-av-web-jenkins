Ext.define('Ext.Praxis.view.salesaudit.ADMReportForm.Info', {
    extend: 'Ext.form.Panel',
    alias: 'widget.'+prototype.id+'-info',
    layout: {
        type: 'vbox',
        align: 'center'
    },
    border: false,
    bodyStyle: 'background-color: #E3EAEF;',
    defaults: {
        bodyStyle: 'background: transparent;',
        border: false
    },
    items: [
        {
            region: 'center',
            id: prototype.id+'-vskDataGrid',
            width: screen.width,
            layout: {
                type: 'vbox',
                align: 'center'
            },
            defaults: {
                bodyStyle: 'background: transparent;',
                align: 'center'
            },
            items: [
                {
                    region: 'center',
                    id: prototype.id+'-boxMainData',
                    width: '100%',
                    hidden: false,
                    border: false,
                    layout: {
                        type: 'vbox',
                        align: 'center'
                    },
                    defaults: {
                        bodyStyle: 'background: transparent;',
                        border: true,
                        align: 'center'
                    },
                    items: [
                        // <editor-fold defaultstate="collapsed" desc="gridData">
                        {
                            xtype: 'grid',
                            id: prototype.id+'-gridData',
                            width: '100%',
                            height: 534,
                            columnLines: true,
                            columns: {
                                defaults: {
                                    menuDisabled: true,
                                    sortable: true,
                                    align: 'center'
                                },
                                items: [
                                    {
                                        xtype: 'checkcolumn', sortable: false,
                                        text: '', dataIndex: 'CHECKED', width: 25,
                                        defaults: {
                                            align: 'center'
                                        },
                                        items: [
                                            {
                                                xtype: 'checkboxfield',
                                                id: prototype.id+'-chkAll',
                                                boxLabel: '',
                                                checked: false,
                                                width: '100%',
                                                listeners: {
                                                    change: 'checkAll_clickHandler',
                                                }
                                            }
                                        ]
                                    },
                                    {
                                        text: 'Ticket', dataIndex: 'A2548TIKET', flex: 1//width: 95
                                    },
                                    {
                                        text: 'Memo<br>Number', dataIndex: 'A2548NMEMO', width: 80
                                    },
                                    {
                                        text: 'Amount', dataIndex: 'A2548NETO', width: 80, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:right;";
                                            return win.formatDblNumber(value);
                                        }
                                    },
                                    {
                                        text: 'IATA', dataIndex: 'A2548IATA', width: 70, sortable: false
                                    },
                                    {
                                        text: 'Agency', dataIndex: 'AGENCY', width: 150,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:left;";
                                            metaData.tdAttr = 'data-qtip="'+data.AGENCY+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Cur.', dataIndex: 'A2548MDA', width: 40, sortable: false
                                    },
                                    {
                                        text: 'Country', dataIndex: 'A2548PAIS', width: 60, sortable: false
                                    },
                                    {
                                        text: 'Source', dataIndex: 'A2548FTE', width: 60, sortable: false
                                    },
                                    {
                                        text: 'Transaction', dataIndex: 'A2548TRNCO', width: 80, sortable: false
                                    },
                                    {
                                        text: 'Tour Code', dataIndex: 'A2548CODIT', width: 80, sortable: false
                                    },
                                    {
                                        text: 'Types', dataIndex: 'A2548TRNCU', width: 50, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'System<br>Date', dataIndex: 'A2548FREGI', width: 70, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Accounting<br>Date / Issue<br>Date', dataIndex: 'A2548FCONT', width: 90, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Bsplink Date', dataIndex: 'A2548FFILE', width: 85, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Invoice', dataIndex: 'A2548NFACT', width: 80, sortable: false
                                    },
                                    {
                                        text: 'User', dataIndex: 'A2548REGIS', width: 100, sortable: false
                                    },
                                    {
                                        text: 'Reason 1', dataIndex: 'A2548DESC1', width: 70,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;";
                                            metaData.tdAttr = 'data-qtip="'+data.A2548DESC1+'"';
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Origin', dataIndex: 'A2548BASE', width: 100, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            metaData.style = "text-align:center;";
                                            return data.A2548BASE === 'PR' ? 'PROCESO REGULAR' :  data.A2548BASE === 'UP' ? 'UpFront' :  data.A2548BASE === 'BK' ? 'BACKEND' : data.A2548BASE === 'MS' ? 'MASSIVE' : data.A2548BASE === 'GP' ? 'GRAN PLAN' : data.A2548BASE === 'QR' ? 'QUERYS' : data.A2548BASE === 'PR' ? 'AUTOMATIC' :'MANUAL';
                                        }
                                    },
                                    {
                                        text: 'Area', dataIndex: 'A2548AREA', width: 100, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Type', dataIndex: 'A2548TYPE', width: 100, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            metaData.style = "text-align:left;";
                                            return value;
                                        }
                                    },
                                    {
                                        text: 'Status', dataIndex: 'A2548FLAG', width: 130, sortable: false,
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var backgroundColor = 
                                                 data.A2548FLAG === 'A' ?  "#99FFCC" : 
                                                (data.A2548FLAG === 'U') ? "#0099FF" :  
                                                (data.A2548FLAG === 'X') ? "#FF0000" : 
                                                (data.A2548FLAG === 'C') ? "#D329E8" :
                                                (data.A2548FLAG === 'P') ? "#14C92F" : 
                                                (data.A2548FLAG === 'I') ? "#14C92F" :  
                                                (data.A2548FLAG === 'F') ? "#14C92F" :  
                                                (data.A2548FLAG === 'Z') ? "#F8D169" : 
                                                (data.A2548FLAG === 'R') ? "#F2A60D" :
                                                (data.A2548FLAG === 'J') ? "#69D3F8" : 
                                                (data.A2548FLAG === 'D') ? "#FF9966" : 
                                                (data.A2548FLAG === 'E') ? "#E8400C" :
                                                (data.A2548FLAG === 'W') ? "#A50C88" :
                                                (data.A2548FLAG === 'B') ? "#CC9966" :
                                                (data.A2548FLAG === 'Y') ? "#CCFF00" :
                                                (data.A2548FLAG === 'N') ? "#FF0000" :
                                                (data.A2548FLAG === 'O') ? "#B03A2E" :
                                                (data.A2548FLAG === 'Q') ? "#DC7633" : 
                                                (data.A2548FLAG === 'L') ? "#B280CC" : "#FFFFFF";
                                            var fontWeight = (data.A2548FLAG === 'X' ? 'bold' :  'bold');
                                            metaData.style = "text-align:center;background-color:"+backgroundColor+";font-weight:" + fontWeight + ";";
                                            var dat = "";
                                            if(data.A2548FLAG==="A")dat ="Approved";
                                            if(data.A2548FLAG==="U")dat ="Cleared Up";
                                            if(data.A2548FLAG==="X")dat ="Canceled";
                                            if(data.A2548FLAG==="C")dat ="Condoned";
                                            if(data.A2548FLAG==="I")dat ="Billed GDS";
                                            if(data.A2548FLAG==="P")dat ="Billed";
                                            if(data.A2548FLAG==="F")dat ="Accredited";
                                            if(data.A2548FLAG==="Z")dat ="Authorized";
                                            if(data.A2548FLAG==="N")dat ="Rejected";
                                            if(data.A2548FLAG==="R")dat ="Reaudited";
                                            if(data.A2548FLAG==="J")dat ="Justified";
                                            if(data.A2548FLAG==="D")dat ="Disputed";
                                            if(data.A2548FLAG==="E")dat ="Rejecte Disputed"; 
                                            if(data.A2548FLAG==="W")dat ="Approve Disputed";
                                            if(data.A2548FLAG==="B" && data.A2548TRNCU==='ADMA')dat ="Adm na BSPlink/MM";
                                            if(data.A2548FLAG==="B" && data.A2548TRNCU!=='ADMA')dat ="Acm na BSPlink/MM";
                                            if(data.A2548FLAG==="O")dat ="IATA Disabled";
                                            if(data.A2548FLAG==="Q")dat ="Unregistered Client";
                                            if(data.A2548FLAG==="L" && data.A2548TRNCU==='ADMB')dat ="Adm BSPlink/MM";
                                            if(data.A2548FLAG==="L" && data.A2548TRNCU!=='ADMB')dat ="Acm BSPlink/MM";
                                            if(data.A2548FLAG==="Y")dat ="Pending";
                                            return dat;
                                        }
                                    },
                                    {
                                        text: '&nbsp;', dataIndex: '', width: 30,
                                        listeners: {
                                            click: 'searchInfoADM'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var src = 'resources/img/icon/16x16/application_view_detail.png';
                                            return '<a href="#salesaudit-adm-report-form"><img src="'+src+'"></a>';
                                        }
                                    },
                                    {
                                        text: 'ADM<br>Tracing', dataIndex: '', width: 60,
                                        listeners: {
                                            click: 'searchDocumt'
                                        },
                                        renderer: function (value, metaData, record, rowIndex, colIndex, store, view) {
                                            var data = record.data;
                                            var src = ( data.A2548CATNDOCUM!==0) ? 'resources/img/icon/16x16/search_docum.png' : '';
                                            return '<a href="#salesaudit-adm-report-form"><img src="'+src+'"></a>';
                                        }
                                    }
                                ]
                            }
                        }
                        // </editor-fold>
                    ]
                }
            ]
        },
        // <editor-fold defaultstate="collapsed" desc="boxPagDetail">
        {
            xtype: 'panel',
            id: prototype.id+'-boxPagDetail',
            hidden: true,
            width: screen.width-4,
            layout: {
                type: 'hbox',
                pack: 'center'
            },
            border: true,
            height: 25,
            bodyStyle: 'background-color: transparent; border: 1px solid #81BEF7',
            defaults: {
                border: false
            },
            items: [
                {
                    xtype: 'panel',
                    width: '100%',
                    height: '100%',
                    layout: {
                        type: 'hbox',
                        pack: 'center'
                    },
                    defaults: {
                        xtype: 'label',
                        margin: '3 0 0 0'
                    },
                    items: [
                        {
                            text: 'Page',
                            width: 50
                        },
                        {
                            id: prototype.id+'-lblPagActual',
                            text: '1',
                            width: 50
                        },
                        {
                            text: 'Of',
                            width: 50
                        },
                        {
                            id: prototype.id+'-lblPagTotal',
                            text: '0',
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 100},
                        {
                            text: 'Total TKT',
                            width: 80
                        },
                        {
                            id: prototype.id+'-lblRowsTotal',
                            text: '0',
                            width: 50
                        },
                        {xtype: 'tbspacer', width: 20},
                        {
                            text: 'Total ADMs',
                            width: 80
                        },
                        {
                            id: prototype.id+'-lblRowsTotalADM',
                            text: '0',
                            width: 50
                        }
                    ]
                }
            ]
        }
        // </editor-fold>
    ]
});