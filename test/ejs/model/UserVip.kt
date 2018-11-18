package com.pinjia.model

import com.dix.base.core.Core
import com.dix.base.common.Const
import com.dix.base.exception.NotExistsException
import com.dix.base.model.BaseModel
import com.dix.base.model.Model
import com.fasterxml.jackson.annotation.JsonProperty

@Model(tableName = "user_vip")
class UserVip : BaseModel() {

    @get:JsonProperty("id") var id: Long = 0L
    @get:JsonProperty("user_id") var userId: Long = 0L
    @get:JsonProperty("vip_level") var vipLevel: Int = 0
    @get:JsonProperty("price") var price: Int = 0
    @get:JsonProperty("begin_time") var beginTime: Long = 0L
    @get:JsonProperty("end_time") var endTime: Long = 0L
    @get:JsonProperty("weight") var weight: Int = 0
    @get:JsonProperty("create_time") var createTime: Long = 0L
    @get:JsonProperty("update_time") var updateTime: Long = 0L
    

    override fun ID(): Long? {
        return id
    }

    override fun keys(): Array<String> {
        return arrayOf("id", "user_id", "vip_level", "price", "begin_time", "end_time", "weight", "create_time", "update_time")
    }

    override fun basicKeys(): Array<String> {
        return arrayOf("id", "user_id", "vip_level", "price", "begin_time", "end_time", "weight", "create_time", "update_time")
    }

    override fun detailKeys(): Array<String> {
        return arrayOf("id", "user_id", "vip_level", "price", "begin_time", "end_time", "weight", "create_time", "update_time")
    }

    override fun process(model: Any, keys: Array<String>?): Map<String, Any>? {
        val map = Core.processModel(model, keys)

        if (map != null)
        {

        }

        return map
    }

    companion object {

        fun findById(id: Long): UserVip? {
            return Core.Q().findById(UserVip::class.java, id)
        }

        fun findOrFail(id: Long): UserVip {
            return findById(id) ?: throw NotExistsException()
        }

        fun getRawById(id: Long): Map<String, Any>? {
            val data = findById(id) ?: return null
            return data.process()
        }
    }
}