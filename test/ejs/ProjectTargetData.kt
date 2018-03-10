package com.pinjia.model

import com.dix.base.core.Core
import com.dix.base.common.Const
import com.dix.base.exception.NotExistsException
import com.dix.base.model.BaseModel
import com.dix.base.model.Model
import com.fasterxml.jackson.annotation.JsonProperty

@Model(tableName = "project_target_data")
class ProjectTargetData : BaseModel() {

    @get:JsonProperty("id") var id: Long = 0L
    @get:JsonProperty("project_id") var projectId: Long = 0L
    @get:JsonProperty("type") var type: Int = 0
    @get:JsonProperty("address_img") var addressImg: String = ""
    @get:JsonProperty("intro_img") var introImg: String = ""
    @get:JsonProperty("sale_sub") var saleSub: Long = 0L
    @get:JsonProperty("start_money") var startMoney: Long = 0L
    @get:JsonProperty("price_over_divided") var priceOverDivided: String = ""
    @get:JsonProperty("bt_content") var btContent: String = ""
    @get:JsonProperty("income_content") var incomeContent: String = ""
    @get:JsonProperty("safe_content") var safeContent: String = ""
    @get:JsonProperty("weight") var weight: Int = 0
    @get:JsonProperty("create_time") var createTime: Long = 0L
    @get:JsonProperty("update_time") var updateTime: Long = 0L
    

    override fun ID(): Long? {
        return id
    }

    override fun keys(): Array<String> {
        return arrayOf("id", "project_id", "type", "address_img", "intro_img", "sale_sub", "start_money", "price_over_divided", "bt_content", "income_content", "safe_content", "weight", "create_time", "update_time")
    }

    override fun basicKeys(): Array<String> {
        return arrayOf("id", "project_id", "type", "address_img", "intro_img", "sale_sub", "start_money", "price_over_divided", "bt_content", "income_content", "safe_content", "weight", "create_time", "update_time")
    }

    override fun detailKeys(): Array<String> {
        return arrayOf("id", "project_id", "type", "address_img", "intro_img", "sale_sub", "start_money", "price_over_divided", "bt_content", "income_content", "safe_content", "weight", "create_time", "update_time")
    }

    override fun process(model: Any, keys: Array<String>?): Map<String, Any>? {
        val map = Core.processModel(model, keys)

        if (map != null)
        {

        }

        return map
    }

    companion object {

        fun findById(id: Long?): ProjectTargetData? {
            return Core.Q().findById(ProjectTargetData::class.java, id)
        }

        fun findOrFail(id: Long?): ProjectTargetData {
            return findById(id) ?: throw NotExistsException()
        }

        fun getRawById(id: Long?): Map<String, Any>? {
            val data = findById(id) ?: return null
            return data.process()
        }
    }
}