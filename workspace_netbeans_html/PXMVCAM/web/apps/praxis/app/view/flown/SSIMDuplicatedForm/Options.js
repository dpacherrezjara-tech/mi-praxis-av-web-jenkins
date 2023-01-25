/* 
 ******************************************************************
 * Program Information                                            *
 *                                                                *
 * Project    : PRAXIS - AM                                       *          
 * Document   : Options                                           *                
 * Created on : 19/02/2018, 11:30:40                              *          
 * Author     : Gregory Sánchez (gsanchez)                        *          
 *                                                                *
 ******************************************************************
 *                  MIAMI TECHNOLOGY GROUP, INC.                  *
 *                           MIATECH                              *
 *                           OF PERU                              *
 ******************************************************************
 * CODIGO PRG FECHA      CONCEPTO
 * 201601 RMC 20-09-2016 SE CREA PROGRAMA A PEDIDO DE JGG.
 ******************************************************************
 */

Ext.define('Ext.Praxis.view.flown.SSIMDuplicatedForm.Options', {
//    xtype: 'panel',
    extend: 'Ext.form.Panel',
    alias: 'widget.' + prototype.id + '-contenedor-options',
    border: false,
//    padding:'0px 0px 0px 50px',
    layout:{
        type: 'hbox',
        pack: 'end'
    },
    items:[
        {
            xtype: 'panel',
            width: 100,
            border: false,
            items: [
                {
                    xtype: 'toolbar',
                    cls: 'x-toolbar-pag',
                    items:[
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-first',
                            iconCls: 'prx-icon-pagination-first',
                            tooltip: 'First Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-previous',
                            iconCls: 'prx-icon-pagination-previous',
                            tooltip: 'Previous Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-next',
                            iconCls: 'prx-icon-pagination-next',
                            tooltip: 'Next Page'

                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-pag-last',
                            iconCls: 'prx-icon-pagination-last',
                            tooltip: 'Last Page'

                        }
                        , {
                            xtype: 'pagingtoolbar',
                            id: prototype.id + '-paggin',
                            pageSize: 10,
                            border: false,
                            displayInfo: false,
                            hidden: true
                        }
                    ]
                }
            ]
        },
        {xtype: 'tbspacer', width: 20},
        {
            xtype: 'panel',
            border: true,
            items: [
                {
                    xtype: 'toolbar',
                    items:[
                        {
                            xtype:'button',
                            id: prototype.id + '-btn-search',
                            iconCls: 'prx-icon-search',
                            tooltip: 'Search',
                            listeners:{
                                click: 'onSearchClick'
                            }
                        },
                        {
                            xtype:'button',
                            id: prototype.id + '-btn-filter',
                            iconCls: 'prx-icon-filter',
                            tooltip: 'Display filter',
                            listeners:{
                                click: 'onFilterClick'
                            }
                        },
                        {
                            xtype:'button',
                            id: prototype.id + '-btn-excel',
                            iconCls: 'prx-icon-excel',
                            tooltip: 'Export to Excel',
                            listeners:{
                                click: 'onExcelClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-clear',
                            iconCls: 'prx-icon-clear',
                            tooltip: 'Clear Options',
                            listeners:{
                                click: 'onClearClick'
                            }
                        },
                        {
                            xtype: 'button',
                            id: prototype.id + '-btn-back',
                            iconCls: 'prx-icon-back',
                            tooltip: 'Back',
                            listeners:{
                                click: 'onBackClick'
                            }
                        }
                    ]
                }
            ]
        }
    ]
});
