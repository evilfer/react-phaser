"use strict";
var chai = require("chai");
var sinon = require("sinon");
var sinonChai = require("sinon-chai");
var expect = chai.expect;
chai.use(sinonChai);

var createInitmpl = require('../../src/node-management/node-init-adapter');
var createTreeImpl = require('../../src/node-management/node-tree-adapter');

describe('node init adapter', function () {
    var nodeTypes, impl, treeImpl;

    beforeEach(function () {
        nodeTypes = {
            a: {
                init: sinon.spy(),
                onChildrenInit: sinon.spy()
            },
            b: {
                init: sinon.spy(),
                onChildrenInit: sinon.spy()
            },
            c: {
                init: sinon.spy(),
                onChildrenInit: sinon.spy()
            }
        };
        impl = createInitmpl(nodeTypes);
        treeImpl = createTreeImpl(impl);
    });


    it('should invoke node init by default', function () {
        var a = treeImpl.components.mount(1, 'a', {}, null);
        expect(nodeTypes.a.init).to.have.been.calledOnce;
        expect(nodeTypes.a.init).to.have.been.calledWith(a);
    });

    it('should invoke node init on children by default', function () {
        var a = treeImpl.components.mount(1, 'a', {}, null),
            b = treeImpl.components.mount(2, 'a', {}, a);

        expect(nodeTypes.a.init).to.have.been.calledTwice;
        expect(nodeTypes.a.init.getCall(0)).to.have.been.calledWith(a);
        expect(nodeTypes.a.init.getCall(1)).to.have.been.calledWith(b);
    });

    it('should invoke mount children', function () {
        var a = treeImpl.components.mount(1, 'a', {}, null),
            b = treeImpl.components.mount(2, 'a', {}, a);

        treeImpl.components.childrenMount(a);

        expect(nodeTypes.a.onChildrenInit).to.have.been.calledOnce;
        expect(nodeTypes.a.onChildrenInit.getCall(0)).to.have.been.calledWith(a);
    });

    it('should not init children for deferred parents', function () {
        nodeTypes.a.deferredInit = true;

        var a = treeImpl.components.mount(1, 'a', {}, null),
            b = treeImpl.components.mount(2, 'b', {}, a);
        treeImpl.components.childrenMount(a);

        expect(nodeTypes.a.init).not.to.have.been.calledOnce;
        expect(nodeTypes.a.onChildrenInit).to.have.been.calledOnce;
        expect(nodeTypes.b.init).not.to.have.been.called;
    });

    it('should not init children for deferred parents', function () {
        nodeTypes.a.deferredInit = true;

        var a = treeImpl.components.mount(1, 'a', {}, null),
            b = treeImpl.components.mount(2, 'b', {}, a);
        treeImpl.components.childrenMount(a);

        expect(nodeTypes.a.init).not.to.have.been.calledOnce;
        expect(nodeTypes.a.onChildrenInit).to.have.been.calledOnce;
        expect(nodeTypes.b.init).not.to.have.been.called;

        expect(a.initialized).to.equal(true);
        expect(b.initialized).to.equal(false);
    });


    it('should init children for deferred parents on request', function () {
        nodeTypes.a.deferredInit = true;
        nodeTypes.a.onChildrenInit = sinon.spy(function (node, tree, implMethods) {
            implMethods.initChildren(node, tree);
        });

        var a = treeImpl.components.mount(1, 'a', {}, null),
            b = treeImpl.components.mount(2, 'b', {}, a);
        treeImpl.components.childrenMount(a);

        expect(nodeTypes.a.init).not.to.have.been.calledOnce;
        expect(nodeTypes.a.onChildrenInit).to.have.been.calledOnce;
        expect(nodeTypes.b.init).to.have.been.calledOnce;
    });

    it('should not init nested children by default, when deferred', function () {
        nodeTypes.a.deferredInit = true;
        nodeTypes.a.onChildrenInit = sinon.spy(function (node, tree, implMethods) {
            implMethods.initChildren(node, tree);
        });

        nodeTypes.b.deferredInit = true;
        nodeTypes.b.onChildrenInit = sinon.spy(function (node, tree, implMethods) {
        });

        var a1 = treeImpl.components.mount(1, 'a', {}, null),
            a2 = treeImpl.components.mount(2, 'b', {}, a1),
            b = treeImpl.components.mount(3, 'c', {}, a2);
        treeImpl.components.childrenMount(a1);

        expect(nodeTypes.a.init).not.to.have.been.called;
        expect(nodeTypes.a.onChildrenInit).to.have.been.calledOnce;
        expect(nodeTypes.b.init).not.to.have.been.called;
        expect(nodeTypes.b.onChildrenInit).to.have.been.calledOnce;
        expect(nodeTypes.b.init).not.to.have.been.calledOnce;
    });

    it('should filter children on deferred init children');

});
