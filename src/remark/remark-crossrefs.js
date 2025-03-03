/**
 * @import {Root} from 'mdast'
 */
import { findAndReplace } from 'mdast-util-find-and-replace'
import {visit} from 'unist-util-visit'

/**
 * Turn gemoji shortcodes (`:+1:`) into emoji (`👍`).
 *
 * @returns
 *   Transform.
 */


const plugin = () => {
    const transformer = async (ast) => {
        const regex = /(?<![\\\"])@(\w[\w\d\-\._:]*[\w\d\-]+)/g;

        visit(ast, 'text', function (node, index, parent) {
            node.value = node.value.replace(regex, "<Crossref target=\"$1\" />")
        })
    }
  return transformer;
}
export default plugin;

function remarkCrossrefs() {
    /**
     * @param {Root} tree
     * @return {undefined}
     */
    // return function (tree) {
    //     findAndReplace(tree, [
    //         /(?<![\\\"])@(\w[\w\d\-\._:]*[\w\d\-]+)/g,
    //         /**
    //          * @param {string} _
    //          * @param {string} $1
    //          * @return {undefined}
    //          */
    //         function (_, $1) {
    //             let name = $1.replace(".", "#")
    //             return "<Crossref target=\"{" + name +"}\" />"
    //         }
    //     ])
    // }
}