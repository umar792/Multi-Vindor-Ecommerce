import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OwnerOrderFunc } from "../../../../redux/actions/OrderAction";
import { UseShopContext } from "../../../../ContextAoi/Context/ShopContext";

function OwnerAllOrder() {
  const dispatch = useDispatch();
  const ownerOrder = useSelector((state) => state.order.ownerOrder);
  const { ShopOwner } = UseShopContext();
  const shopOwnerid = ShopOwner._id;

  useEffect(() => {
    dispatch(OwnerOrderFunc());
  }, []);

  return <div>OwnerAllOrder</div>;
}

export default OwnerAllOrder;
